import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppPage } from "@components/layout/AppPage";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";

function ProtectedAppPage() {
  const { selectedClient, user, businessManagers } = useAppContext();
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<number | null>(null);

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
      setErrorCode(1008);
    }
  }, [loading, selectedClient, useCases]);

  if (loading) return <LoadingAppUI />;

  if (errorCode !== null) return <ErrorPage errorCode={errorCode} />;

  return <AppPage />;
}

export { ProtectedAppPage };
