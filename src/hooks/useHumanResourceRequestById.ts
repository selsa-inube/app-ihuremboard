import { useState, useEffect } from "react";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest/getHumanResoursceByNumber";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";

export const useHumanResourceRequest = <T>(
  requestNumber: string | null | undefined,
  formatData: (data: HumanResourceRequest) => T,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showErrorFlag, setShowErrorFlag] = useState(false);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();

  useErrorFlag(!!showErrorFlag, error?.message);

  const fetchData = async () => {
    if (!requestNumber || !selectedClient?.id) {
      console.warn("Faltan parámetros requeridos:", {
        requestNumber,
        selectedClient,
      });
      return;
    }

    setIsLoading(true);
    setShowErrorFlag(false);
    try {
      const headers = await getHeaders();
      headers["X-Business-Unit"] = selectedClient.id;

      const response = await getHumanResourceRequests(requestNumber, headers);

      if (response) {
        setData(formatData(response));
        setError(null);
      } else {
        const notFoundError = new Error("No se encontró la solicitud.");
        setError(notFoundError);
        setData(null);
      }
    } catch (err) {
      const finalError = err instanceof Error ? err : new Error(String(err));
      setError(finalError);
      setData(null);
      if (finalError.message !== "No se encontró la solicitud.") {
        setShowErrorFlag(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (requestNumber && selectedClient?.id) {
      fetchData();
    }
  }, [requestNumber, selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
