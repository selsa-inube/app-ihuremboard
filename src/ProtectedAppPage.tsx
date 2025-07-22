import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppPage } from "@components/layout/AppPage";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";
import { useLocation } from "react-router-dom";
import { useSignOut } from "@hooks/useSignOut";

function ProtectedAppPage() {
  const { selectedClient, user, businessManagers, setUseCasesByRole } =
    useAppContext();
  const navigate = useNavigate();
  const { useCases, loading } = useUseCasesByStaff({
    userName: user?.id ?? "",
    businessUnitCode: selectedClient?.name ?? "",
    businessManagerCode: businessManagers?.publicCode ?? "",
  });
  const location = useLocation();
  const { signOut } = useSignOut();
  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

  useEffect(() => {
    if (selectedClient && !loading) {
      if (!useCases?.listOfUseCasesByRoles?.includes("PortalBoardAccess")) {
        location.state = { code: 1008, signOut: true };
        signOut("/error?code=1008");
      } else {
        setUseCasesByRole(useCases.listOfUseCasesByRoles);
      }
    }
  }, [loading, selectedClient, useCases, navigate, setUseCasesByRole, signOut]);

  if (loading) {
    return <LoadingAppUI />;
  }

  return <AppPage />;
}

export { ProtectedAppPage };
