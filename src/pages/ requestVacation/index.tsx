import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { useSignOut } from "@hooks/useSignOut";

function RequestVacation() {
  const { id: requestNumber } = useParams();
  const { selectedClient } = useAppContext();
  const { signOut } = useSignOut();

  const shouldFetch = Boolean(requestNumber && selectedClient?.id);

  const { isLoading, error } = useHumanResourceRequest<HumanResourceRequest>(
    shouldFetch ? requestNumber! : null,
    (data) => data,
  );

  useEffect(() => {
    if (!isLoading && error) {
      if (error.message === "No se encontró la solicitud.") {
        signOut("/error?code=404");
      } else {
        signOut("/error?code=500");
      }
    }
  }, [isLoading, error, signOut]);

  if (isLoading || !shouldFetch) {
    return <LoadingAppUI />;
  }

  return null;
}

export { RequestVacation };
