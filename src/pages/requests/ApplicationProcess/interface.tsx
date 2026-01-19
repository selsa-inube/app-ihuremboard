import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useIAuth } from "@inube/iauth-react";

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
import { usePatchHumanResourceDisbursement } from "@hooks/usePatchHumanResourceDisbursement";

function isRequestConfigKey(
  value: string,
): value is keyof typeof requestConfigs {
  return value in requestConfigs;
}

function formatDateWithOffset(date: string): string {
  const d = new Date(date);

  const offsetMinutes = -d.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);

  const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
  const minutes = String(absOffset % 60).padStart(2, "0");

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T00:00:00.000${sign}${hours}:${minutes}`;
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

  const [decision, setDecision] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [disbursementDate, setDisbursementDate] = useState<string>("");

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

  const { updateDisbursementDate, isLoading: isUpdatingDisbursement } =
    usePatchHumanResourceDisbursement();

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

  const taskNameToUse = assignedTask?.taskName ?? "";
  const taskCodeToUse = assignedTask?.taskCode ?? "";
  const taskManagingId = assignedTask?.taskManagingId ?? "";

  const shouldShowDisbursementDateField = useMemo(() => {
    const status = requestData?.humanResourceRequestStatus as
      | string
      | undefined;
    const type = requestData?.humanResourceRequestType as string | undefined;

    const isManageVacationPay = status === "manage_vacation_pay";
    const isPaidVacations = type === "paid_vacations";

    return isManageVacationPay && isPaidVacations;
  }, [
    requestData?.humanResourceRequestStatus,
    requestData?.humanResourceRequestType,
  ]);

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

  const handleSaveDisbursementDate = useCallback(
    async (dateValue: string) => {
      if (
        !requestData?.humanResourceRequestId ||
        !requestData?.humanResourceRequestData
      ) {
        return false;
      }

      try {
        let currentData = {};
        try {
          currentData =
            typeof requestData.humanResourceRequestData === "string"
              ? JSON.parse(requestData.humanResourceRequestData)
              : requestData.humanResourceRequestData;
        } catch (e) {
          Logger.warn("Error parsing humanResourceRequestData", {
            error: e instanceof Error ? e.message : String(e),
          });
        }

        const disbursementDateFormatted = formatDateWithOffset(dateValue);

        const updatedData = {
          ...currentData,
          disbursementDate: disbursementDateFormatted,
        };

        await updateDisbursementDate({
          humanResourceRequestId: requestData.humanResourceRequestId,
          humanResourceRequestData: JSON.stringify(updatedData),
          modifyJustification:
            "Registro de fecha de desembolso de vacaciones pagadas",
        });

        setDisbursementDate(dateValue);
        return true;
      } catch (err) {
        Logger.error(
          "Error saving disbursement date",
          err instanceof Error ? err : new Error(String(err)),
        );
        return false;
      }
    },
    [requestData, updateDisbursementDate],
  );

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
            setDisbursementDate("");
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
    disbursementDate,
    setDisbursementDate,
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
    handleSaveDisbursementDate,
    loadingUpdate,
    allTasksCompleted,
    shouldShowDisbursementDateField,
    isUpdatingDisbursement,
  };
}
