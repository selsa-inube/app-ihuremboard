import {
  ERequestStatus,
  ERequestType,
  ETaskStatus,
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskToManageHumanResourceRequest,
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
  employeeName: String(item.employeeName ?? ""),
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
  taskName: String(item.taskName ?? ""),
  taskStatus: getValidEnumValue(
    ETaskStatus,
    item.taskStatus,
    "Estado desconocido",
  ) as ETaskStatus,
  description: String(item.description ?? ""),
});

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
};
