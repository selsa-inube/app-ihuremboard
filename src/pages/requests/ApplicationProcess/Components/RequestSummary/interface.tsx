import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IOption } from "@inubekit/inubekit";

export interface HumanResourceRequestData {
  daysToPay?: string | number;
  daysOff?: string | number;
  startDate?: string;
  startDateEnyoment?: string;
  contractNumber?: string;
  contractId?: string;
  businessName?: string;
  contractType?: string;
  observationEmployee?: string;
  addressee?: string;
  certificationType?: string;
}

export interface RequestSummaryProps {
  isLoading?: boolean;
  requestNumber?: string | number;
  requestDate?: string;
  title?: string;
  status?: string;
  fullStaffName?: string;
  statusOptions?: IOption[];
  humanResourceRequestData?: HumanResourceRequestData | string;
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
  const rawHumanResourceRequestData =
    props.humanResourceRequestData ?? state?.humanResourceRequestData ?? {};
  const requestType = props.requestType ?? state?.requestType ?? "";

  let parsedData: HumanResourceRequestData = {};
  if (rawHumanResourceRequestData) {
    try {
      parsedData =
        typeof rawHumanResourceRequestData === "string"
          ? JSON.parse(rawHumanResourceRequestData)
          : (rawHumanResourceRequestData ?? {});
    } catch (e) {
      console.warn("Error parseando humanResourceRequestData:", e);
      parsedData = {};
    }
  }

  let daysToPay: string;
  if (requestType === "certification") {
    daysToPay = "-";
  } else if (requestType === "vacations_enjoyed") {
    daysToPay = parsedData.daysOff?.toString() ?? "N/A";
  } else {
    daysToPay = parsedData.daysToPay?.toString() ?? "N/A";
  }

  const startDate =
    parsedData.startDate ?? parsedData.startDateEnyoment ?? undefined;
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
