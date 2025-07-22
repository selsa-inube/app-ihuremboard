import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";

import { GlobalStyles } from "@styles/global";
import { BusinessUnitsLoader } from "src/BusinessUnitsLoader";
import { AppProvider } from "@context/AppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { protectedRouter } from "@src/routes/protectedRoutes";

export function ProtectedRoutes() {
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
