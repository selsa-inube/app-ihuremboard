import { useState, useCallback } from "react";

import { updateHumanResourceRequest } from "@services/humanResources/updateHumanResourceRequest";
import { ITraceability, ITask } from "@ptypes/humanResources.types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

interface IHumanResourceRequestResponse {
  employeeId: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: string;
  humanResourceRequestType: string;
  modifyJustification: string;
  humanResourceRequestTraceabilities: ITraceability[];
  tasksToManageTheHumanResourcesRequests: ITask[];
}

interface IUseUpdateHumanResourceRequestResult {
  updateRequest: (
    requestId: string,
    actionExecuted: string,
    description: string,
    userWhoExecutedAction: string,
    businessUnit?: string,
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  data: IHumanResourceRequestResponse | null;
}

export const useUpdateHumanResourceRequest =
  (): IUseUpdateHumanResourceRequestResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<IHumanResourceRequestResponse | null>(
      null,
    );

    const { getHeaders } = useHeaders();
    const { showErrorModal } = useErrorModal();

    const updateRequest = useCallback(
      async (
        requestId: string,
        actionExecuted: string,
        description: string,
        userWhoExecutedAction: string,
        businessUnit?: string,
      ) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
          const headers = await getHeaders();
          const bu = businessUnit ?? headers["X-Business-Unit"];

          const response = await updateHumanResourceRequest(
            requestId,
            actionExecuted,
            description,
            userWhoExecutedAction,
            bu,
          );

          setData(response);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Ocurrió un error al actualizar la solicitud";

          setError(errorMessage);

          const errorConfig = modalErrorConfig[1018];
          showErrorModal({
            descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
            solutionText: errorConfig.solutionText,
          });
        } finally {
          setLoading(false);
        }
      },
      [getHeaders, showErrorModal],
    );

    return { updateRequest, loading, error, data };
  };
