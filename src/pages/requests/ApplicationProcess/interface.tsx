import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { IRoute } from "@components/layout/AppMenu/types";
import { requestConfigs } from "@config/requests.config";
import { capitalizeFullName } from "@utils/string";
import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { useEvaluateResponsibleOfTasks } from "@hooks/useEvaluateResponsibleOfTasks";
import { useHeaders } from "@hooks/useHeaders";
import { useHumanDecisionTasks } from "@hooks/useHumanDecisionTasks";

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

  const [showActions, setShowActions] = useState(false);
  const [decision, setDecision] = useState<string>("");

  const requestNumberParam = state?.requestNumber ?? id ?? "";
  const { data: requestData, isLoading: isLoadingRequest } =
    useHumanResourceRequest(requestNumberParam);

  const taskNameToUse =
    requestData?.tasksToManageTheHumanResourcesRequests?.[0]?.taskName ?? "";

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

  const {
    data: decisionsData,
    loading: loadingDecisions,
    error: errorDecisions,
  } = useHumanDecisionTasks(
    taskNameToUse,
    resolvedHeaders?.["X-Business-Unit"] ?? "",
    !!resolvedHeaders && !!taskNameToUse,
  );

  const firstGroup =
    responsibleData && responsibleData.length > 0 ? responsibleData[0] : null;

  const responsibleLabel =
    !firstGroup || firstGroup.responsible.length !== 1
      ? "Sin responsable"
      : capitalizeFullName(
          `${firstGroup.responsible[0].names.trim()} ${firstGroup.responsible[0].surnames.trim()}`,
        );

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");
  const handleSend = () => console.log("Decisión seleccionada:", decision);

  return {
    id,
    state,
    decision,
    setDecision,
    showActions,
    setShowActions,
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
  };
}
