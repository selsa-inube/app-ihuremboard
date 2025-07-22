import { AppPage } from "@components/layout/AppPage";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";
import { useValidatePortalAccess } from "@hooks/useValidatePortalAccess";

function ProtectedAppPage() {
  const { loading, isAuthorized } = useValidatePortalAccess(true);

  if (loading || isAuthorized === null) {
    return <LoadingAppUI />;
  }

  if (isAuthorized === false) {
    return null;
  }

  return <AppPage />;
}

export { ProtectedAppPage };
