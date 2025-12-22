import { useState, useEffect } from "react";

import { getHumanEmployeeResourceRequests } from "@services/humanResourcesRequest/getHumanEmployeeResourcesRequest";
import { HumanEmployeeResourceRequest } from "@ptypes/humanEmployeeResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

export const useHumanEmployeeResourceRequests = <T>(
  formatData: (data: HumanEmployeeResourceRequest[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();
  const { showErrorModal } = useErrorModal();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const headers = await getHeaders();
      const requests = await getHumanEmployeeResourceRequests(headers);

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
          module: "useHumanEmployeeResourceRequests",
          action: "getHumanEmployeeResourceRequests",
          selectedClientId: selectedClient?.id,
        },
      );

      setError(normalizedError);
      setData([]);

      const errorConfig = modalErrorConfig[1013];
      showErrorModal({
        descriptionText: errorConfig.descriptionText,
        solutionText: errorConfig.solutionText,
      });
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
