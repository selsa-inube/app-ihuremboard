import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useIAuth } from "@inube/iauth-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { usePortalAuth } from "@hooks/usePortalAuth";
import { useSignOut } from "@hooks/useSignOut";
import { GlobalStyles } from "@styles/global";
import { AppProvider } from "@context/AppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { protectedRouter } from "@routes/protectedRoutes";

import { BusinessUnitsLoader } from "src/BusinessUnitsLoader";

export function ProtectedRoutes() {
  const {
    portalCode,
    portalData,
    hasPortalError,
    hasManagersError,
    businessManagersData,
    errorCode,
  } = usePortalAuth();

  const { signOut } = useSignOut();

  const { loginWithRedirect, isAuthenticated, isLoading, error } = useIAuth();

  if (error) {
    signOut("/error?code=1009");
  }

  if (!portalCode) {
    return <ErrorPage errorCode={1001} />;
  }

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasPortalError &&
      !hasManagersError
    ) {
      loginWithRedirect();
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasPortalError,
    hasManagersError,
  ]);

  if (isLoading) {
    return <LoadingAppUI />;
  }

  if (hasPortalError || hasManagersError) {
    return <ErrorPage errorCode={errorCode ?? 1001} />;
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
