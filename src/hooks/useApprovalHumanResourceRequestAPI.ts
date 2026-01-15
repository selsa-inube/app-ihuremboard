import { useState } from "react";

import { Logger } from "@utils/logger";
import { postApprovalHumanResourceRequest } from "@services/employeeConsultation/postApprovalHumanResourceRequest";
import {
  IApprovalRequestBody,
  ApprovalAction,
} from "@services/employeeConsultation/postApprovalHumanResourceRequest/types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_POST_APPROVAL_FAILED = 1024;

interface ISubmitApprovalParams {
  humanResourceRequestId: string;
  taskManagingId: string;
  actionExecuted: ApprovalAction;
  description: string;
  userWhoExecutedAction: string;
  onSuccess?: () => void;
}

export function useApprovalHumanResourceRequestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const submitApproval = async ({
    humanResourceRequestId,
    taskManagingId,
    actionExecuted,
    description,
    userWhoExecutedAction,
    onSuccess,
  }: ISubmitApprovalParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = await getHeaders();

      const requestBody: IApprovalRequestBody = {
        actionExecuted,
        description,
        humanResourceRequestId,
        taskManagingId,
        userWhoExecutedAction,
      };

      const response = await postApprovalHumanResourceRequest(
        requestBody,
        headers,
      );

      if (response?.humanResourceRequestId) {
        setIsLoading(false);
        onSuccess?.();
        return { success: true, response };
      }

      setIsLoading(false);
      return { success: false };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      Logger.error("Error submitting approval", error, {
        humanResourceRequestId,
        actionExecuted,
      });

      setError(error);

      const errorConfig = modalErrorConfig[ERROR_CODE_POST_APPROVAL_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });

      setIsLoading(false);
      return { success: false };
    }
  };

  return {
    submitApproval,
    isLoading,
    error,
  };
}
