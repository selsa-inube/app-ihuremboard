import { useState } from "react";

import { Logger } from "@utils/logger";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { patchHumanResourceDisbursement } from "@services/humanResourcesRequest/patchHumanResourceRequest";
import { IPatchDisbursementRequestBody } from "@services/humanResourcesRequest/patchHumanResourceRequest/types";

const ERROR_CODE_PATCH_DISBURSEMENT_FAILED = 1021;

export const usePatchHumanResourceDisbursement = () => {
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const updateDisbursementDate = async (
    requestBody: IPatchDisbursementRequestBody,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = await getHeaders();

      Logger.info("PATCH disbursement date", {
        requestId: requestBody.humanResourceRequestId,
        payload: requestBody,
      });

      await patchHumanResourceDisbursement(requestBody, headers);

      setData(true);
      return true;
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));

      Logger.error("Error updating disbursement date", errorInstance, {
        requestBody,
      });

      setError(errorInstance);

      const errorConfig =
        modalErrorConfig[ERROR_CODE_PATCH_DISBURSEMENT_FAILED];

      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${errorInstance.message}`,
        solutionText: errorConfig.solutionText,
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(undefined);
    setError(null);
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    updateDisbursementDate,
    reset,
  };
};
