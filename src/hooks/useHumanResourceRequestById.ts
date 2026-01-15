import { useState, useEffect } from "react";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest/getHumanResoursceByNumber";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

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

      console.log("🧪 RESPONSE RAW (backend):", response);

      if (!response || Object.keys(response).length === 0) {
        setError(1013);

        const errorConfig = modalErrorConfig[1013];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });

        return;
      }

      // ✅ EL BACKEND DEVUELVE ARRAY → TOMAMOS EL PRIMERO
      const request = Array.isArray(response) ? response[0] : response;

      console.log("🧪 REQUEST NORMALIZADO:", request);
      console.log("🧪 TASKS:", request?.tasksToManageTheHumanResourcesRequests);

      // ✅ PARSEAR humanResourceRequestData (viene como string)
      const normalizedRequest: HumanResourceRequest = {
        ...request,
        humanResourceRequestData:
          typeof request.humanResourceRequestData === "string"
            ? JSON.parse(request.humanResourceRequestData)
            : request.humanResourceRequestData,
      };

      console.log("✅ REQUEST FINAL SETEADO:", normalizedRequest);

      setData(normalizedRequest);
    } catch (error: unknown) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Unknown error while fetching HR request");

      Logger.error(
        "Error al obtener la solicitud de recursos humanos",
        normalizedError,
        {
          module: "useHumanResourceRequest",
          action: "getHumanResourceRequests",
          requestNumber,
          selectedClientId: selectedClient?.id,
        },
      );

      setError(1008);

      const errorConfig = modalErrorConfig[1008];
      showErrorModal({
        descriptionText: errorConfig.descriptionText,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [requestNumber, selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
