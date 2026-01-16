import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useIAuth } from "@inube/iauth-react";

import {
  HumanResourceRequest,
  HumanResourceRequestData,
} from "@ptypes/humanResourcesRequest.types";
import { Logger } from "@utils/logger";
import { IRoute } from "@components/layout/AppMenu/types";
import { requestConfigs } from "@config/requests.config";
import { capitalizeFullName } from "@utils/string";
import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { useHeaders } from "@hooks/useHeaders";
import { useHumanDecisionTasks } from "@hooks/useHumanDecisionTasks";
import { useApprovalHumanResourceRequestAPI } from "@hooks/useApprovalHumanResourceRequestAPI";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { ApprovalAction } from "@services/employeeConsultation/postApprovalHumanResourceRequest/types";
import { useHumanEmployeeResourceRequests } from "@hooks/useHumanEmployeeResourceRequests";
import { HumanEmployeeResourceRequest } from "@ptypes/humanEmployeeResourcesRequest.types";
import { ERequestStatus } from "@ptypes/humanResourcesRequest.types";

function isRequestConfigKey(
  value: string,
): value is keyof typeof requestConfigs {
  return value in requestConfigs;
}

function getVacationEndDate(requestData: HumanResourceRequest): Date | null {
  if (!requestData?.humanResourceRequestData) return null;

  const data: HumanResourceRequestData =
    typeof requestData.humanResourceRequestData === "string"
      ? JSON.parse(requestData.humanResourceRequestData)
      : requestData.humanResourceRequestData;

  const startDateStr = data.startDateEnyoment;
  const daysOff = Number(data.daysOff);

  if (!startDateStr || isNaN(daysOff)) return null;

  const startDate = new Date(startDateStr);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + daysOff);

  return endDate;
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
  const navigate = useNavigate();

  const [decision, setDecision] = useState("");
  const [comment, setComment] = useState("");

  const [showVacationInfo, setShowVacationInfo] = useState(false);

  const requestNumberParam = state?.requestNumber ?? id ?? "";

  const {
    data: requestData,
    isLoading: isLoadingRequest,
    refetch,
  } = useHumanResourceRequest(requestNumberParam);

  const { data: employeeRequests } =
    useHumanEmployeeResourceRequests<HumanEmployeeResourceRequest>(
      (data) => data,
    );

  const employeeRequest = employeeRequests.find(
    (req) => req.humanResourceRequestId === requestData?.humanResourceRequestId,
  );

  const assignedTask =
    requestData?.tasksToManageTheHumanResourcesRequests?.find(
      (task) => task.taskStatus === "assigned",
    ) ?? null;

  const responsibleLabel = useMemo(() => {
    if (assignedTask?.staffName && assignedTask?.staffLastName) {
      return capitalizeFullName(
        `${assignedTask.staffName.trim()} ${assignedTask.staffLastName.trim()}`,
      );
    }

    if (employeeRequest?.staffName && employeeRequest?.staffLastName) {
      return capitalizeFullName(
        `${employeeRequest.staffName.trim()} ${employeeRequest.staffLastName.trim()}`,
      );
    }

    return "Sin responsable";
  }, [
    assignedTask?.staffName,
    assignedTask?.staffLastName,
    employeeRequest?.staffName,
    employeeRequest?.staffLastName,
  ]);

  const allTasksCompleted =
    requestData?.tasksToManageTheHumanResourcesRequests?.every(
      (task) => task.taskStatus !== "assigned",
    ) ?? false;

  const vacationValidation = useMemo(() => {
    const currentStatus = requestData?.humanResourceRequestStatus;

    const assignedTask =
      requestData?.tasksToManageTheHumanResourcesRequests?.find(
        (task) => task.taskStatus === "assigned",
      ) ?? null;

    const isConfirmationStatus =
      currentStatus === ERequestStatus.confirmation_of_vacation_taken ||
      assignedTask?.taskName === "confirm_vacation_completion" ||
      (assignedTask?.description?.toLowerCase().includes("confirmar") &&
        assignedTask?.description?.toLowerCase().includes("disfrute"));

    if (!isConfirmationStatus) {
      return { shouldDisable: false, endDate: null, message: null };
    }

    const endDate = getVacationEndDate(requestData);
    if (!endDate) {
      return { shouldDisable: false, endDate: null, message: null };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const shouldDisable = today < endDate;

    return {
      shouldDisable,
      endDate,
      message: shouldDisable
        ? `La decisión estará habilitada después del ${endDate.toLocaleDateString(
            "es-CO",
            { year: "numeric", month: "long", day: "numeric" },
          )}`
        : null,
    };
  }, [requestData]);

  const openVacationInfo = () => setShowVacationInfo(true);
  const closeVacationInfo = () => setShowVacationInfo(false);

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
            navigate("/requests");
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
      navigate,
    ],
  );

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
    loadingDecisions,
    errorDecisions,
    decisionsData,
    updatedAppRoute,
    displayRequestLabel,
    displayDescription,
    handleExecute,
    handleAttach,
    handleSeeAttachments,
    handleSend,
    loadingUpdate,
    allTasksCompleted,
    vacationValidation,
    showVacationInfo,
    openVacationInfo,
    closeVacationInfo,
  };
}
