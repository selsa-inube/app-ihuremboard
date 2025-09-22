import { useState, useEffect } from "react";
import { getHumanEmployeeResourceRequests } from "@services/humanResourcesRequest/getHumanEmployeeResourcesRequest";
import { HumanEmployeeResourceRequest } from "@ptypes/humanEmployeeResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";

export const useHumanEmployeeResourceRequests = <T>(
  formatData: (data: HumanEmployeeResourceRequest[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = await getHeaders();
      const requests = await getHumanEmployeeResourceRequests(headers);
      setData(formatData(requests ?? []));
      setError(null);
    } catch (err) {
      const finalError = err instanceof Error ? err : new Error(String(err));
      setError(finalError);
      setData([]);
      console.error(
        "Error al obtener solicitudes de recursos humanos:",
        finalError,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClient?.id) {
      fetchData();
    }
  }, [selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
