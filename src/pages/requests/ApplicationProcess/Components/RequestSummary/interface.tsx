import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IOption } from "@inubekit/inubekit";
import { HumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

export interface RequestSummaryProps {
  isLoading?: boolean;
  requestNumber?: string | number;
  requestDate?: string;
  title?: string;
  status?: string;
  fullStaffName?: string;
  statusOptions?: IOption[];
  humanResourceRequestData?: HumanResourceRequestData;
  requestType?: string;
}

export const useRequestSummaryLogic = (props: RequestSummaryProps) => {
  const location = useLocation();
  const state = location.state as RequestSummaryProps | undefined;

  const requestNumber = props.requestNumber ?? state?.requestNumber ?? "";
  const requestDate = props.requestDate ?? state?.requestDate ?? "";
  const title = props.title ?? state?.title ?? "";
  const status = props.status ?? state?.status ?? "";
  const fullStaffName = props.fullStaffName ?? state?.fullStaffName ?? "";
  const statusOptions = props.statusOptions ?? state?.statusOptions ?? [];
  const rawData =
    props.humanResourceRequestData ?? state?.humanResourceRequestData ?? "{}";

  const requestType = props.requestType ?? state?.requestType ?? "";

  let parsedData: HumanResourceRequestData = {};
  try {
    parsedData = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

    if (typeof parsedData !== "object" || parsedData === null) {
      parsedData = {};
    }
  } catch (e) {
    console.warn("Error parseando humanResourceRequestData:", e, rawData);
    parsedData = {};
  }

  let daysToPay = "";
  if (requestType === "certification") {
    daysToPay = "-";
  } else if (requestType === "vacations_enjoyed") {
    daysToPay = parsedData.daysOff?.toString() ?? "";
  } else {
    daysToPay =
      parsedData.daysToPay?.toString() ?? parsedData.daysOff?.toString() ?? "";
  }

  const startDateRaw = parsedData.startDate ?? parsedData.startDateEnyoment;
  const startDate = startDateRaw ? formatDate(startDateRaw) : "";

  const disbursementDateRaw =
    parsedData.disbursementDate ?? parsedData.startDateEnyoment;
  const disbursementDate = disbursementDateRaw
    ? formatDate(disbursementDateRaw)
    : "";

  const contractNumber =
    parsedData.contractNumber ?? parsedData.contractId ?? "N/A";
  const businessName = parsedData.businessName ?? "N/A";
  const contractType = parsedData.contractType ?? "N/A";

  const observationEmployee =
    parsedData.observationEmployee ?? parsedData.addressee ?? "N/A";

  const staffDisplayName = fullStaffName ?? "Sin responsable";
  const statusLabel =
    statusOptions.find((opt) => opt.value === status)?.label ??
    status ??
    "Sin estado";

  const [showActions, setShowActions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");

  return {
    requestNumber,
    requestDate,
    title,
    statusLabel,
    staffDisplayName,
    daysToPay,
    startDate,
    disbursementDate,
    contractNumber,
    businessName,
    contractType,
    observationEmployee,
    showActions,
    setShowActions,
    showDetails,
    setShowDetails,
    handleDiscard,
    handleExecute,
    handleAttach,
    handleSeeAttachments,
  };
};
