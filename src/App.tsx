import { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";
import { useStaffUserAccount } from "@hooks/useStaffUserAccount";
import { useBusinessManagers } from "@hooks/useBusinessManagers";

import { LoginRoutes } from "./routes/login";
import { Login } from "./pages/login";
import { GlobalStyles } from "./styles/global";
import { BusinessUnitsLoader } from "./BusinessUnitsLoader";
import { useAppContext } from "./context/AppContext/useAppContext";
import { AppProvider } from "./context/AppContext";
import { ProtectedAppPage } from "./ProtectedAppPage";
import { RequestsRoutes } from "./routes/requests";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";
import ErrorPageContainer from "@pages/error";

// Componente para rutas públicas (sin autenticación)
function PublicRoutes() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={publicRouter} />
    </>
  );
}

// Componente para rutas protegidas (con autenticación)
function ProtectedRoutes() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

  if (!portalCode) {
    return <ErrorPage errorCode={1001} />;
  }

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const {
    portalData,
    hasError: hasPortalError,
    isFetching,
  } = usePortalData(portalCode);

  const {
    businessManagersData,
    hasError: hasManagersError,
    codeError: businessManagersCode,
    isFetching: isFetchingManagers,
  } = useBusinessManagers(portalData);

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasPortalError &&
      !isFetching &&
      !isFetchingManagers
    ) {
      loginWithRedirect();
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasPortalError,
    isFetching,
    isFetchingManagers,
  ]);

  if (isLoading || isFetching || isFetchingManagers) {
    return <LoadingAppUI />;
  }

  if (hasPortalError || hasManagersError) {
    return <ErrorPage errorCode={businessManagersCode ?? 1001} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppProvider
      dataPortal={portalData}
      businessManagersData={businessManagersData}
      businessUnitsData={[]}
    >
      <GlobalStyles />
      <BusinessUnitsLoader portalCode={portalCode} />
      <RouterProvider router={protectedRouter} />
    </AppProvider>
  );
}

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}

function FirstPage() {
  const { user, setStaffUser } = useAppContext();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const {
    userAccount,
    hasError: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount({
    userAccountId: user?.id ?? "",
  });

  useEffect(() => {
    if (userAccount && !userAccountLoading && !userAccountError) {
      setStaffUser(userAccount);
      navigate(`/login/${userAccount}/checking-credentials`, { replace: true });
    }
  }, [
    userAccount,
    userAccountLoading,
    userAccountError,
    setStaffUser,
    navigate,
  ]);

  if (!isAuthenticated) {
    return <ErrorPage />;
  }

  if (userAccountLoading) {
    return <LoadingAppUI />;
  }

  if (userAccountError || !userAccount) {
    return <ErrorPage errorCode={1004} />;
  }

  return <Login />;
}

// Router para rutas públicas (sin autenticación)
const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Aquí puedes agregar tus rutas públicas */}
      <Route path="/public-page" element={<div>Página Pública</div>} />
      <Route path="/error" element={<ErrorPageContainer />} />
      <Route path="/help" element={<div>Página de Ayuda</div>} />
      <Route path="/terms" element={<div>Términos y Condiciones</div>} />
      <Route path="*" element={<ProtectedRoutes />} />
    </>,
  ),
);

// Router para rutas protegidas (con autenticación)
const protectedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={<FirstPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="/login/*" element={<LoginRoutes />} />
      <Route path="/" element={<ProtectedAppPage />}>
        <Route index element={<RequestsRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
      <Route path="*" element={<ProtectedAppPage />} />
    </>,
  ),
);

function App() {
  const currentPath = window.location.pathname;
  const publicPaths = ["/public-page", "/help", "/terms", "/error"];
  const isPublicRoute = publicPaths.some((path) =>
    currentPath.startsWith(path),
  );
  if (isPublicRoute) {
    return <PublicRoutes />;
  }
  return <ProtectedRoutes />;
}

export default App;
