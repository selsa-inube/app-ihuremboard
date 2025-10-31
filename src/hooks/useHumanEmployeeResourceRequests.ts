import { useState, useEffect } from "react";

import { getHumanEmployeeResourceRequests } from "@services/humanResourcesRequest/getHumanEmployeeResourcesRequest";
import { HumanEmployeeResourceRequest } from "@ptypes/humanEmployeeResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

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
    } catch (err) {
      const finalError = err instanceof Error ? err : new Error(String(err));
      setError(finalError);
      setData([]);
      console.error(
        "Error al obtener solicitudes de recursos humanos:",
        finalError,
      );
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Ocurrió un error al actualizar la solicitud";

      const errorConfig = modalErrorConfig[1013];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
        solutionText: errorConfig.solutionText,
      });
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
