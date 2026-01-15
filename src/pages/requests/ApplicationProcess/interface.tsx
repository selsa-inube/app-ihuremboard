import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useIAuth } from "@inube/iauth-react";

import { Logger } from "@utils/logger";
import { IRoute } from "@components/layout/AppMenu/types";
import { requestConfigs } from "@config/requests.config";
import { capitalizeFullName } from "@utils/string";
import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { useEvaluateResponsibleOfTasks } from "@hooks/useEvaluateResponsibleOfTasks";
import { useHeaders } from "@hooks/useHeaders";
import { useHumanDecisionTasks } from "@hooks/useHumanDecisionTasks";
import { useApprovalHumanResourceRequestAPI } from "@hooks/useApprovalHumanResourceRequestAPI";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { ApprovalAction } from "@services/employeeConsultation/postApprovalHumanResourceRequest/types";

export interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  description: string;
  requestLabel: string;
}

function isRequestConfigKey(
  value: string,
): value is keyof typeof requestConfigs {
  return value in requestConfigs;
}

export function useApplicationProcessLogic(appRoute: IRoute[]) {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation() as {
    state?: {
      requestNumber?: string;
      requestDate?: string;
      fullStaffName?: string;
      title?: string;
      status?: string;
    };
  };

  const { user } = useIAuth();

  const [decision, setDecision] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const requestNumberParam = state?.requestNumber ?? id ?? "";

  const {
    data: requestData,
    isLoading: isLoadingRequest,
    refetch,
  } = useHumanResourceRequest(requestNumberParam);

  const assignedTask =
    requestData?.tasksToManageTheHumanResourcesRequests?.find(
      (task) => task.taskStatus === "assigned",
    ) ?? null;

  const allTasksCompleted =
    requestData?.tasksToManageTheHumanResourcesRequests?.every(
      (task) => task.taskStatus !== "assigned",
    ) ?? false;

  const taskNameToUse = assignedTask?.taskName ?? "";
  const taskCodeToUse = assignedTask?.taskCode ?? "";
  const taskManagingId = assignedTask?.taskManagingId ?? "";

  const rawLabel =
    requestData?.humanResourceRequestDescription ?? state?.title ?? "";

  const parts = rawLabel.trim().split(" ");
  const keyCandidate = parts[parts.length - 1];

  const finalRequestLabel = isRequestConfigKey(keyCandidate)
    ? requestConfigs[keyCandidate].label
    : rawLabel;

  const config = Object.values(requestConfigs).find(
    (cfg) => cfg.label.toLowerCase() === finalRequestLabel.toLowerCase(),
  );

  const displayRequestLabel =
    finalRequestLabel.toLowerCase() === "solicitud"
      ? finalRequestLabel
      : `Solicitud de ${config?.label ?? finalRequestLabel}`;

  const displayDescription = config?.description ?? "Descripción no disponible";

  const updatedAppRoute = appRoute.map((crumb) =>
    crumb.id === `/requests/${id}`
      ? { ...crumb, label: displayRequestLabel }
      : crumb,
  );

  const headers = useHeaders();
  const [resolvedHeaders, setResolvedHeaders] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    const fetchHeaders = async () => {
      const h = await headers.getHeaders();
      setResolvedHeaders(h);
    };
    fetchHeaders();
  }, []);

  const {
    data: responsibleData,
    loading,
    error,
  } = useEvaluateResponsibleOfTasks({
    requestId: requestData?.humanResourceRequestId ?? "",
    headers: resolvedHeaders ?? {},
    enabled: !!resolvedHeaders && !!requestData?.humanResourceRequestId,
  });

  const firstGroup = responsibleData?.[0] ?? null;

  const responsibleLabel =
    firstGroup?.responsible?.length !== 1
      ? "Sin responsable"
      : capitalizeFullName(
          `${firstGroup.responsible[0].names.trim()} ${firstGroup.responsible[0].surnames.trim()}`,
        );

  const {
    data: decisionsData,
    loading: loadingDecisions,
    error: errorDecisions,
  } = useHumanDecisionTasks(
    taskNameToUse,
    resolvedHeaders?.["X-Business-Unit"] ?? "",
    !!resolvedHeaders && !!taskNameToUse,
    taskCodeToUse,
  );

  const {
    submitApproval,
    isLoading: loadingUpdate,
    error: errorUpdate,
  } = useApprovalHumanResourceRequestAPI();

  useErrorFlag({
    flagShown: !!errorUpdate,
    message: errorUpdate?.message ?? undefined,
  });

  const handleSend = useCallback(
    async (commentToSend?: string) => {
      if (!decision || !requestData?.humanResourceRequestId || !assignedTask) {
        return;
      }

      try {
        await submitApproval({
          humanResourceRequestId: requestData.humanResourceRequestId,
          taskManagingId,
          actionExecuted: decision as ApprovalAction,
          description: commentToSend ?? "Sin observaciones",
          userWhoExecutedAction: user?.id ?? "Sin identificación",
          onSuccess: () => {
            setComment("");
            setDecision("");
            void refetch();
          },
        });
      } catch (err) {
        Logger.error(
          "Error sending approval",
          err instanceof Error ? err : new Error(String(err)),
        );
      }
    },
    [
      decision,
      requestData,
      assignedTask,
      submitApproval,
      taskManagingId,
      user,
      refetch,
    ],
  );

  const handleDiscard = () => Logger.info("Descartar solicitud");
  const handleExecute = () => Logger.info("Ejecutar solicitud");
  const handleAttach = () => Logger.info("Adjuntar archivos");
  const handleSeeAttachments = () => Logger.info("Ver adjuntos");

  return {
    id,
    state,
    decision,
    setDecision,
    comment,
    setComment,
    showActions: Boolean(assignedTask),
    requestData,
    isLoadingRequest,
    responsibleLabel,
    loading,
    error,
    loadingDecisions,
    errorDecisions,
    decisionsData,
    updatedAppRoute,
    displayRequestLabel,
    displayDescription,
    handleDiscard,
    handleExecute,
    handleAttach,
    handleSeeAttachments,
    handleSend,
    loadingUpdate,
    allTasksCompleted,
  };
}
