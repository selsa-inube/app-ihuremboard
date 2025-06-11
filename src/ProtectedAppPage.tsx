import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppPage } from "@components/layout/AppPage";
import { useAppContext } from "@context/AppContext/useAppContext";

function ProtectedAppPage() {
  const { selectedClient } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

  return <AppPage />;
}

export { ProtectedAppPage };
