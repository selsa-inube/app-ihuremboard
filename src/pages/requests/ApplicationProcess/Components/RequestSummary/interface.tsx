import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IOption } from "@inubekit/inubekit";

import { Logger } from "@utils/logger";

import {
  HumanResourceRequestData,
  ERequestType,
  ERequestStatus,
  EContractType,
} from "@ptypes/humanResourcesRequest.types";
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
  handleDiscard?: () => void;
  handleExecute?: () => void;
  handleAttach?: () => void;
  handleSeeAttachments?: () => void;
}

export const useRequestSummaryLogic = (props: RequestSummaryProps) => {
  const location = useLocation();
  const state = location.state as RequestSummaryProps | undefined;

  const requestNumber = props.requestNumber ?? state?.requestNumber ?? "";
  const rawRequestDate = props.requestDate ?? state?.requestDate ?? "";
  const rawTitle = props.title ?? state?.title ?? "";
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
    Logger.warn("Error parseando humanResourceRequestData", {
      error: e,
      rawData,
    });
    parsedData = {};
  }

  const isVacationsEnjoyed = requestType === "vacations_enjoyed";

  let daysToPay = "";
  if (requestType === "certification") {
    daysToPay = "-";
  } else if (isVacationsEnjoyed) {
    daysToPay = parsedData.daysOff?.toString() ?? "";
  } else {
    daysToPay =
      parsedData.daysToPay?.toString() ?? parsedData.daysOff?.toString() ?? "";
  }

  const requestDate = rawRequestDate ? formatDate(rawRequestDate) : "";
  const startDateRaw = parsedData.startDate ?? parsedData.startDateEnyoment;
  const startDate = startDateRaw ? formatDate(startDateRaw) : "";

  const disbursementDateRaw =
    parsedData.disbursementDate ?? parsedData.startDateEnyoment;
  const disbursementDate = disbursementDateRaw
    ? formatDate(disbursementDateRaw)
    : "";

  const startDateEnjoymentRaw = parsedData.startDateEnyoment;
  const startDateEnjoyment = startDateEnjoymentRaw
    ? formatDate(startDateEnjoymentRaw)
    : "";

  const endDateEnjoymentRaw = parsedData.endDateEnjoyment;
  const endDateEnjoyment = endDateEnjoymentRaw
    ? formatDate(endDateEnjoymentRaw)
    : "";

  const contractNumber =
    parsedData.contractNumber ?? parsedData.contractId ?? "N/A";
  const businessName = parsedData.businessName ?? "N/A";

  const contractType = parsedData.contractType
    ? (EContractType[parsedData.contractType as keyof typeof EContractType] ??
      parsedData.contractType)
    : "N/A";

  const observationEmployee =
    parsedData.observationEmployee ?? parsedData.addressee ?? "N/A";

  const staffDisplayName = fullStaffName ?? "Sin responsable";

  const statusLabel =
    statusOptions.find((opt) => opt.value === status)?.label ??
    ERequestStatus[status as keyof typeof ERequestStatus] ??
    status ??
    "Sin estado";

  const title =
    requestType && ERequestType[requestType as keyof typeof ERequestType]
      ? ERequestType[requestType as keyof typeof ERequestType]
      : (rawTitle ?? "N/A");

  const [showActions, setShowActions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDiscard =
    props.handleDiscard ?? (() => Logger.info("Descartar solicitud"));
  const handleExecute =
    props.handleExecute ?? (() => Logger.info("Ejecutar solicitud"));
  const handleAttach =
    props.handleAttach ?? (() => Logger.info("Adjuntar archivos"));
  const handleSeeAttachments =
    props.handleSeeAttachments ?? (() => Logger.info("Ver adjuntos"));

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
    startDateEnjoyment,
    endDateEnjoyment,
    isVacationsEnjoyed,
  };
};
