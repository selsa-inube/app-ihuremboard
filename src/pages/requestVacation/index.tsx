import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { useAppContext } from "@context/AppContext/useAppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { useSignOut } from "@hooks/useSignOut";

function RequestVacation() {
  const { id: requestNumber } = useParams();
  const { selectedClient } = useAppContext();
  const { signOut } = useSignOut();

  const { isLoading, error } = useHumanResourceRequest(requestNumber);

  useEffect(() => {
    if (!isLoading && error) {
      const errorCode = (error as { code?: number })?.code ?? 500;
      signOut(`/error?code=${errorCode}`);
    }
  }, [isLoading, error, signOut]);

  if (isLoading || !requestNumber || !selectedClient?.id) {
    return <LoadingAppUI />;
  }

  return null;
}

export { RequestVacation };
