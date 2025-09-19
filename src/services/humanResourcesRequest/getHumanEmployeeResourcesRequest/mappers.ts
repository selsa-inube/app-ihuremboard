import {
  ERequestType,
  ETaskStatus,
  HumanResourceRequestBlockingPerTask,
  TaskNameMapping,
} from "@ptypes/humanResourcesRequest.types";
import { HumanEmployeeResourceRequest } from "@src/types/humanEmployeeResourcesRequest.types";
import { getValidEnumValue } from "@utils/enumValidator";

const mapHumanEmployeeResourceRequestApiToEntity = (
  item: Partial<HumanEmployeeResourceRequest>,
): HumanEmployeeResourceRequest => ({
  description: String(item.description ?? ""),
  employeeId: String(item.employeeId ?? ""),
  employeeStatus: String(item.employeeStatus ?? ""),
  humanResourceRequestDate: String(item.humanResourceRequestDate ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  humanResourceRequestNumber: String(item.humanResourceRequestNumber ?? ""),
  humanResourceRequestType: getValidEnumValue(
    ERequestType,
    item.humanResourceRequestType,
    "Tipo desconocido",
  ) as ERequestType,
  identificationDocumentNumber: String(item.identificationDocumentNumber ?? ""),
  identificationType: String(item.identificationType ?? ""),
  names: String(item.names ?? ""),
  positionName: String(item.positionName ?? ""),
  staffIdentificationDocumentNumber: String(
    item.staffIdentificationDocumentNumber ?? "",
  ),
  staffLastName: String(item.staffLastName ?? ""),
  staffName: String(item.staffName ?? ""),
  surnames: String(item.surnames ?? ""),
  taskCode: String(item.taskCode ?? ""),
  taskManagingId: String(item.taskManagingId ?? ""),
  taskName: getValidEnumValue(
    TaskNameMapping,
    item.taskName,
    "Sin tarea",
  ) as keyof typeof TaskNameMapping,
  taskStatus: getValidEnumValue(
    ETaskStatus,
    item.taskStatus,
    "",
  ) as ETaskStatus,

  humanResourceRequestBlockingPerTasks: Array.isArray(
    item.humanResourceRequestBlockingPerTasks,
  )
    ? item.humanResourceRequestBlockingPerTasks.map(mapBlockingTaskApiToEntity)
    : [],
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
  mapHumanEmployeeResourceRequestApiToEntity,
  mapBlockingTaskApiToEntity,
};
