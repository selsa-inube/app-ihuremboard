import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppPage } from "@components/layout/AppPage";

import { useAppContext } from "@context/AppContext/useAppContext";
import { useOptionsMenu } from "@hooks/useOptionsMenu";

interface ProtectedAppPageProps {
  withNav?: boolean;
  withBanner?: boolean;
  fullWidth?: boolean;
}

function ProtectedAppPage(props: ProtectedAppPageProps) {
  const { withNav = true, fullWidth = false } = props;
  const { selectedClient, provisionedPortal, setOptionForCustomerPortal } =
    useAppContext();
  const navigate = useNavigate();

  const publicCode = provisionedPortal.publicCode ?? "";
  const clientId = selectedClient?.id ?? "";
  const { optionData } = useOptionsMenu(publicCode, clientId);

  useEffect(() => {
    if (optionData) {
      setOptionForCustomerPortal(optionData);
    }
  }, [optionData, setOptionForCustomerPortal]);

  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

  return <AppPage withNav={withNav} fullWidth={fullWidth} />;
}

export { ProtectedAppPage };
