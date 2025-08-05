import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest/getHumanResoursceByNumber";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";

interface CustomError extends Error {
  code?: number;
}

export const useHumanResourceRequest = <T>(
  requestNumber: string | null | undefined,
  formatData: (data: HumanResourceRequest) => T,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CustomError | null>(null);
  const [showErrorFlag, setShowErrorFlag] = useState(false);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();

  useErrorFlag(showErrorFlag, error?.message);

  const handleError = (err: unknown) => {
    const finalError: CustomError =
      err instanceof Error ? err : new Error(String(err));
    finalError.code ??= 500;
    setError(finalError);
    setData(null);
    if (finalError.code !== 404) setShowErrorFlag(true);
  };

  const fetchData = async () => {
    if (!requestNumber || !selectedClient?.id) return;

    setIsLoading(true);
    setShowErrorFlag(false);

    try {
      const headers = await getHeaders();
      const response = await getHumanResourceRequests(requestNumber, headers);

      if (!response) {
        throw Object.assign(new Error("No se encontró la solicitud."), {
          code: 404,
        });
      }

      const formatted = formatData(response);
      setData(formatted);
      setError(null);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestNumber, selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
