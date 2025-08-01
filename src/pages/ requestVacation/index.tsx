import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHumanResourceRequestById } from "@hooks/useHumanResourceRequestById";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

function RequestVacation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedClient } = useAppContext();

  const shouldFetch = Boolean(id && selectedClient?.id);

  const { isLoading, error } =
    useHumanResourceRequestById<HumanResourceRequest>(
      shouldFetch ? id! : null,
      (data) => data,
    );

  useEffect(() => {
    if (!isLoading && error?.message === "Solicitud no encontrada") {
      navigate("/error/404");
    }
  }, [isLoading, error, navigate]);

  return null;
}

export { RequestVacation };
