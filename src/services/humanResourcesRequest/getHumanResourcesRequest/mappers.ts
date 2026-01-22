import {
  ERequestStatus,
  ERequestType,
  ETaskStatus,
  TaskNameMapping,
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskToManageHumanResourceRequest,
  HumanResourceRequestBlockingPerTask,
  HumanResourceRequestData,
} from "@ptypes/humanResourcesRequest.types";
import { getValidEnumValue } from "@utils/enumValidator";

const mapHumanResourceRequestApiToEntity = (
  item: Record<string, string | number | object>,
): HumanResourceRequest => ({
  humanResourceRequestId:
    typeof item.humanResourceRequestId === "string" ||
    typeof item.humanResourceRequestId === "number"
      ? String(item.humanResourceRequestId)
      : "",
  humanResourceRequestNumber:
    typeof item.humanResourceRequestNumber === "string" ||
    typeof item.humanResourceRequestNumber === "number"
      ? String(item.humanResourceRequestNumber)
      : "",
  humanResourceRequestDescription:
    typeof item.humanResourceRequestDescription === "string" ||
    typeof item.humanResourceRequestDescription === "number"
      ? String(item.humanResourceRequestDescription)
      : "",
  humanResourceRequestDate:
    typeof item.humanResourceRequestDate === "string" ||
    typeof item.humanResourceRequestDate === "number"
      ? String(item.humanResourceRequestDate)
      : "",
  humanResourceRequestStatus: getValidEnumValue(
    ERequestStatus,
    item.humanResourceRequestStatus,
    "Estado desconocido",
  ) as ERequestStatus,
  humanResourceRequestData: mapHumanResourceRequestDataApiToEntity(
    typeof item.humanResourceRequestData === "string" &&
      item.humanResourceRequestData !== null
      ? (JSON.parse(item.humanResourceRequestData) as Record<string, unknown>)
      : {},
  ),
  humanResourceRequestType: getValidEnumValue(
    ERequestType,
    item.humanResourceRequestType,
    "Tipo desconocido",
  ) as ERequestType,

  employeeId:
    typeof item.employeeId === "string" || typeof item.employeeId === "number"
      ? String(item.employeeId)
      : "",
  employeeName:
    typeof item.employeeName === "string" ||
    typeof item.employeeName === "number"
      ? String(item.employeeName)
      : typeof item.names === "string" || typeof item.names === "number"
        ? String(item.names)
        : "",
  employeeStatus:
    typeof item.employeeStatus === "string" ||
    typeof item.employeeStatus === "number"
      ? String(item.employeeStatus)
      : "",
  identificationDocumentNumber:
    typeof item.identificationDocumentNumber === "string" ||
    typeof item.identificationDocumentNumber === "number"
      ? String(item.identificationDocumentNumber)
      : "",
  identificationType:
    typeof item.identificationType === "string" ||
    typeof item.identificationType === "number"
      ? String(item.identificationType)
      : "",
  names:
    typeof item.names === "string" || typeof item.names === "number"
      ? String(item.names)
      : "",
  taskName: (
    Object.keys(TaskNameMapping) as (keyof typeof TaskNameMapping)[]
  ).includes(item.taskName as keyof typeof TaskNameMapping)
    ? (item.taskName as keyof typeof TaskNameMapping)
    : "update_personal_details",
  surnames:
    typeof item.surnames === "string" || typeof item.surnames === "number"
      ? String(item.surnames)
      : "",
  positionName:
    typeof item.positionName === "string" ||
    typeof item.positionName === "number"
      ? String(item.positionName)
      : "",

  staffIdentificationDocumentNumber:
    typeof item.staffIdentificationDocumentNumber === "string" ||
    typeof item.staffIdentificationDocumentNumber === "number"
      ? String(item.staffIdentificationDocumentNumber)
      : "",
  staffLastName:
    typeof item.staffLastName === "string" ||
    typeof item.staffLastName === "number"
      ? String(item.staffLastName)
      : "",
  staffName:
    typeof item.staffName === "string" || typeof item.staffName === "number"
      ? String(item.staffName)
      : "",

  humanResourceRequestTraceabilities: Array.isArray(
    item.humanResourceRequestTraceabilities,
  )
    ? item.humanResourceRequestTraceabilities.map(
        mapHumanResourceRequestTraceabilityApiToEntity,
      )
    : [],

  tasksToManageTheHumanResourcesRequests: Array.isArray(
    item.tasksToManageTheHumanResourcesRequests,
  )
    ? item.tasksToManageTheHumanResourcesRequests.map(
        mapTaskManagingHumanResourceRequestApiToEntity,
      )
    : [],

  humanResourceRequestBlockingPerTasks: Array.isArray(
    item.humanResourceRequestBlockingPerTasks,
  )
    ? item.humanResourceRequestBlockingPerTasks.map(mapBlockingTaskApiToEntity)
    : [],
});

const mapHumanResourceRequestTraceabilityApiToEntity = (
  item: Partial<HumanResourceRequestTraceability>,
): HumanResourceRequestTraceability => ({
  traceabilityId:
    typeof item.traceabilityId === "string" ||
    typeof item.traceabilityId === "number"
      ? String(item.traceabilityId)
      : "",
  humanResourceRequestId:
    typeof item.humanResourceRequestId === "string" ||
    typeof item.humanResourceRequestId === "number"
      ? String(item.humanResourceRequestId)
      : "",
  actionExecuted:
    typeof item.actionExecuted === "string" ||
    typeof item.actionExecuted === "number"
      ? String(item.actionExecuted)
      : "",
  userWhoExecutedAction:
    typeof item.userWhoExecutedAction === "string" ||
    typeof item.userWhoExecutedAction === "number"
      ? String(item.userWhoExecutedAction)
      : "",
  executionDate:
    typeof item.executionDate === "string" ||
    typeof item.executionDate === "number"
      ? String(item.executionDate)
      : "",
  description:
    typeof item.description === "string" || typeof item.description === "number"
      ? String(item.description)
      : "",
});

const mapTaskManagingHumanResourceRequestApiToEntity = (
  item: Partial<TaskToManageHumanResourceRequest>,
): TaskToManageHumanResourceRequest => ({
  taskManagingId:
    typeof item.taskManagingId === "string" ||
    typeof item.taskManagingId === "number"
      ? String(item.taskManagingId)
      : "",
  humanResourceRequestId:
    typeof item.humanResourceRequestId === "string" ||
    typeof item.humanResourceRequestId === "number"
      ? String(item.humanResourceRequestId)
      : "",
  taskCode:
    typeof item.taskCode === "string" || typeof item.taskCode === "number"
      ? String(item.taskCode)
      : "",
  taskName: item.taskName as keyof typeof TaskNameMapping,
  taskStatus: getValidEnumValue(
    ETaskStatus,
    item.taskStatus,
    "Estado desconocido",
  ) as ETaskStatus,
  description:
    typeof item.description === "string" || typeof item.description === "number"
      ? String(item.description)
      : "",
});

const mapHumanResourceRequestDataApiToEntity = (
  item: Partial<HumanResourceRequestData>,
): HumanResourceRequestData => ({
  contractId:
    typeof item.contractId === "string" || typeof item.contractId === "number"
      ? String(item.contractId)
      : "",
  contractNumber:
    typeof item.contractNumber === "string" ||
    typeof item.contractNumber === "number"
      ? String(item.contractNumber)
      : "",
  businessName:
    typeof item.businessName === "string" ||
    typeof item.businessName === "number"
      ? String(item.businessName)
      : "",
  startDate:
    typeof item.startDate === "string" || typeof item.startDate === "number"
      ? String(item.startDate)
      : "",
  contractType:
    typeof item.contractType === "string" ||
    typeof item.contractType === "number"
      ? String(item.contractType)
      : "",
  observationEmployee:
    typeof item.observationEmployee === "string" ||
    typeof item.observationEmployee === "number"
      ? String(item.observationEmployee)
      : "",
  daysToPay: item.daysToPay ?? "",
  disbursementDate:
    typeof item.disbursementDate === "string" ||
    typeof item.disbursementDate === "number"
      ? String(item.disbursementDate)
      : "",
  daysOff: item.daysOff ?? "",
  startDateEnyoment:
    typeof item.startDateEnyoment === "string" ||
    typeof item.startDateEnyoment === "number"
      ? String(item.startDateEnyoment)
      : "",
  endDateEnjoyment:
    typeof item.endDateEnjoyment === "string" ||
    typeof item.endDateEnjoyment === "number"
      ? String(item.endDateEnjoyment)
      : "",
  certificationType:
    typeof item.certificationType === "string" ||
    typeof item.certificationType === "number"
      ? String(item.certificationType)
      : "",
  addressee:
    typeof item.addressee === "string" || typeof item.addressee === "number"
      ? String(item.addressee)
      : "",
});

const mapBlockingTaskApiToEntity = (
  item: Partial<HumanResourceRequestBlockingPerTask>,
): HumanResourceRequestBlockingPerTask => ({
  blockType:
    typeof item.blockType === "string" || typeof item.blockType === "number"
      ? String(item.blockType)
      : "",
  description:
    typeof item.description === "string" || typeof item.description === "number"
      ? String(item.description)
      : "",
  errorId:
    typeof item.errorId === "string" || typeof item.errorId === "number"
      ? String(item.errorId)
      : "",
  registrationDate:
    typeof item.registrationDate === "string" ||
    typeof item.registrationDate === "number"
      ? String(item.registrationDate)
      : "",
  taskManagingId:
    typeof item.taskManagingId === "string" ||
    typeof item.taskManagingId === "number"
      ? String(item.taskManagingId)
      : "",
});

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
  mapBlockingTaskApiToEntity,
  mapHumanResourceRequestDataApiToEntity,
};
