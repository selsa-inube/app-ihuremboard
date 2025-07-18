import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "@components/layout/AppPage";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";

function ProtectedAppPage() {
  const { selectedClient, user, businessManagers, setUseCasesByRole } =
    useAppContext();

  const { logout } = useAuth0();
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [sessionCleared, setSessionCleared] = useState(false);

  const { useCases, loading } = useUseCasesByStaff({
    userName: user?.id ?? "",
    businessUnitCode: selectedClient?.name ?? "",
    businessManagerCode: businessManagers?.publicCode ?? "",
  });

  useEffect(() => {
    if (!loading && useCases?.listOfUseCasesByRoles?.length > 0) {
      setUseCasesByRole([
        {
          listOfUseCasesByRoles: useCases.listOfUseCasesByRoles,
        },
      ]);
      // ✅ Guarda también en localStorage si es necesario
      localStorage.setItem(
        "useCasesByRole",
        JSON.stringify([
          { listOfUseCasesByRoles: useCases.listOfUseCasesByRoles },
        ]),
      );
    }
  }, [loading, useCases, setUseCasesByRole]);

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
      if (!sessionCleared) {
        setSessionCleared(true);
        setErrorCode(1008);

        // ✅ Limpieza segura antes de cerrar sesión
        localStorage.removeItem("useCasesByRole");
        sessionStorage.clear();

        setTimeout(() => {
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }, 100); // Espera corta para asegurar que se borre
      }
    }
  }, [loading, selectedClient, useCases, sessionCleared, logout]);

  if (loading) return <LoadingAppUI />;
  if (errorCode !== null) return <ErrorPage errorCode={errorCode} />;

  return <AppPage />;
}

export { ProtectedAppPage };
