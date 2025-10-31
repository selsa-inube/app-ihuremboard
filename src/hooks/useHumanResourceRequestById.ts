import { useState, useEffect } from "react";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest/getHumanResoursceByNumber";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

export const useHumanResourceRequest = (
  requestNumber: string | null | undefined,
) => {
  const [data, setData] = useState<HumanResourceRequest>(
    {} as HumanResourceRequest,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();
  const { showErrorModal } = useErrorModal();

  const fetchData = async () => {
    if (!requestNumber || !selectedClient?.id) return;

    setIsLoading(true);

    try {
      const headers = await getHeaders();
      const response = await getHumanResourceRequests(requestNumber, headers);
      if (!response || Object.keys(response).length === 0) {
        setError(1013);
        const errorConfig = modalErrorConfig[1013];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
        return;
      }
      setData(response);
    } catch (err) {
      console.error("Error al obtener la solicitud de recursos humanos:", err);
      setError(1008);
      const errorConfig = modalErrorConfig[1008];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestNumber, selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
