import { useState, useEffect } from "react";
import { getHumanResourceRequestById } from "@services/humanResourcesRequest/getHumanResourcesRequestId";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";

export const useHumanResourceRequestById = <T>(
  requestId: string | null | undefined,
  formatData: (data: HumanResourceRequest) => T,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();

  const fetchData = async () => {
    if (!requestId || !selectedClient?.id) {
      console.warn("Faltan parámetros requeridos:", {
        requestId,
        selectedClient,
      });
      return;
    }

    setIsLoading(true);
    try {
      const headers = await getHeaders();
      headers["X-Business-Unit"] = selectedClient.id;

      const response = await getHumanResourceRequestById(requestId, headers);

      if (response) {
        setData(formatData(response));
      } else {
        setData(null);
      }

      setError(null);
    } catch (err) {
      const finalError = err instanceof Error ? err : new Error(String(err));
      setError(finalError);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (requestId && selectedClient?.id) {
      fetchData();
    }
  }, [requestId, selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
