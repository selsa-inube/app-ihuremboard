import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";
import { Logger } from "@utils/logger";

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
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
      const requests = await getHumanResourceRequests(headers);

      setData(formatData(requests ?? []));
      setError(null);
    } catch (error: unknown) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Unknown error while fetching HR requests");

      Logger.error(
        "Error al obtener solicitudes de recursos humanos",
        normalizedError,
        {
          module: "useHumanResourceRequests",
          action: "getHumanResourceRequests",
          selectedClientId: selectedClient?.id,
        },
      );

      setError(normalizedError);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClient?.id) {
      void fetchData();
    }
  }, [selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
