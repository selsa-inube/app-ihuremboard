import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppPage } from "@components/layout/AppPage";

import { useAppContext } from "@context/AppContext/useAppContext";
import { useOptionsMenu } from "@hooks/useOptionsMenu";

function ProtectedAppPage() {
  const {
    selectedClient,
    provisionedPortal,
    optionForCustomerPortal,
    setOptionForCustomerPortal,
  } = useAppContext();
  const navigate = useNavigate();

  const publicCode = provisionedPortal.publicCode ?? "";
  const clientId = selectedClient?.id ?? "";
  const { optionData } = useOptionsMenu(publicCode, clientId);
  setOptionForCustomerPortal(optionData);

  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate, optionForCustomerPortal]);

  return <AppPage />;
}

export { ProtectedAppPage };
