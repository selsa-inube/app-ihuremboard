import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  businessUnitId?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = await getHeaders();
      const requests = await getHumanResourceRequests(headers, businessUnitId);
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
    if (businessUnitId) {
      fetchData();
    }
  }, [businessUnitId]);

  return { data, isLoading, error, refetch: fetchData };
};
