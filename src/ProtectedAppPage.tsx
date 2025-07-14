import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppPage } from "@components/layout/AppPage";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";

function ProtectedAppPage() {
  const { selectedClient, user, businessManagers } = useAppContext();
  const navigate = useNavigate();
  console.log("ProtectedAppPage - selectedClient:", selectedClient);
  const { useCases, loading } = useUseCasesByStaff({
    userName: user?.id ?? "",
    businessUnitCode: selectedClient?.name ?? "",
    businessManagerCode: businessManagers?.publicCode ?? "",
  });

  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

  useEffect(() => {
    if (
      !loading &&
      selectedClient &&
      !useCases?.listOfUseCasesByRoles?.includes("PortalBoardAccess")
    ) {
      navigate("/logout", { replace: true });
    }
  }, [loading, selectedClient]);

  if (loading) {
    return <LoadingAppUI />;
  }

  return <AppPage />;
}

export { ProtectedAppPage };
