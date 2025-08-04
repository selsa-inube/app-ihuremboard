import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

function RequestVacation() {
  const { id: requestNumber } = useParams();
  const navigate = useNavigate();
  const { selectedClient } = useAppContext();

  const shouldFetch = Boolean(requestNumber && selectedClient?.id);

  const { isLoading, error } = useHumanResourceRequest<HumanResourceRequest>(
    shouldFetch ? requestNumber! : null,
    (data) => data,
  );

  useEffect(() => {
    if (!isLoading && error?.message === "No se encontró la solicitud.") {
      navigate("/error/404");
    }
  }, [isLoading, error, navigate]);

  return null;
}

export { RequestVacation };
