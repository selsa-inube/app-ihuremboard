import {
  ERequestStatus,
  ERequestType,
  ETaskStatus,
  TaskNameMapping,
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskToManageHumanResourceRequest,
  HumanResourceRequestBlockingPerTask,
} from "@ptypes/humanResourcesRequest.types";
import { getValidEnumValue } from "@utils/enumValidator";

const mapHumanResourceRequestApiToEntity = (
  item: Partial<HumanResourceRequest>,
): HumanResourceRequest => ({
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  humanResourceRequestNumber: String(item.humanResourceRequestNumber ?? ""),
  humanResourceRequestDescription: String(
    item.humanResourceRequestDescription ?? "",
  ),
  humanResourceRequestDate: String(item.humanResourceRequestDate ?? ""),
  humanResourceRequestStatus: getValidEnumValue(
    ERequestStatus,
    item.humanResourceRequestStatus,
    "Estado desconocido",
  ) as ERequestStatus,
  humanResourceRequestData:
    item.humanResourceRequestData ??
    ({} as HumanResourceRequest["humanResourceRequestData"]),
  humanResourceRequestType: getValidEnumValue(
    ERequestType,
    item.humanResourceRequestType,
    "Tipo desconocido",
  ) as ERequestType,

  employeeId: String(item.employeeId ?? ""),
  employeeName: String(item.employeeName ?? item.names ?? ""),
  employeeStatus: String(item.employeeStatus ?? ""),
  identificationDocumentNumber: String(item.identificationDocumentNumber ?? ""),
  identificationType: String(item.identificationType ?? ""),
  names: String(item.names ?? ""),
  taskName: (
    Object.keys(TaskNameMapping) as (keyof typeof TaskNameMapping)[]
  ).includes(item.taskName as keyof typeof TaskNameMapping)
    ? (item.taskName as keyof typeof TaskNameMapping)
    : "update_personal_details",
  surnames: String(item.surnames ?? ""),
  positionName: String(item.positionName ?? ""),

  staffIdentificationDocumentNumber: String(
    item.staffIdentificationDocumentNumber ?? "",
  ),
  staffLastName: String(item.staffLastName ?? ""),
  staffName: String(item.staffName ?? ""),

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
  traceabilityId: String(item.traceabilityId ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  actionExecuted: String(item.actionExecuted ?? ""),
  userWhoExecutedAction: String(item.userWhoExecutedAction ?? ""),
  executionDate: String(item.executionDate ?? ""),
  description: String(item.description ?? ""),
});

const mapTaskManagingHumanResourceRequestApiToEntity = (
  item: Partial<TaskToManageHumanResourceRequest>,
): TaskToManageHumanResourceRequest => ({
  taskManagingId: String(item.taskManagingId ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  taskCode: String(item.taskCode ?? ""),
  taskName: getValidEnumValue(
    TaskNameMapping,
    item.taskName,
    "Tarea desconocida",
  ) as TaskNameMapping,
  taskStatus: getValidEnumValue(
    ETaskStatus,
    item.taskStatus,
    "Estado desconocido",
  ) as ETaskStatus,
  description: String(item.description ?? ""),
});

const mapBlockingTaskApiToEntity = (
  item: Partial<HumanResourceRequestBlockingPerTask>,
): HumanResourceRequestBlockingPerTask => ({
  blockType: String(item.blockType ?? ""),
  description: String(item.description ?? ""),
  errorId: String(item.errorId ?? ""),
  registrationDate: String(item.registrationDate ?? ""),
  taskManagingId: String(item.taskManagingId ?? ""),
});

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
  mapBlockingTaskApiToEntity,
};
