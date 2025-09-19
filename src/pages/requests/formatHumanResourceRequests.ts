import {
  HumanResourceRequest,
  ETaskStatus,
} from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";
import { Status } from "./types";

export const formatHumanResourceRequests = (
  requests: HumanResourceRequest[],
  employeeId?: string,
  referenceDate: Date = new Date(),
) => {
  const filtered = employeeId
    ? requests.filter((req) => req.employeeId === employeeId)
    : requests;

  return filtered.map((req) => {
    const tasks = req.tasksToManageTheHumanResourcesRequests || [];
    const hasTasks = tasks.length > 0;

    const allExecuted =
      hasTasks && tasks.every((t) => t.taskStatus === ETaskStatus.executed);

    const hasUnassignedTask = tasks.some(
      (t) =>
        t.taskStatus === ETaskStatus.assigned &&
        !req.staffName &&
        !req.staffLastName &&
        !req.staffIdentificationDocumentNumber,
    );

    const hasResponsible = !!(req.staffName || req.staffLastName);

    const requestDate = new Date(req.humanResourceRequestDate);
    const sameMonthAndYear =
      requestDate.getMonth() === referenceDate.getMonth() &&
      requestDate.getFullYear() === referenceDate.getFullYear();

    let status: Status;

    if (allExecuted && sameMonthAndYear) {
      status = "completed";
    } else if (hasUnassignedTask) {
      status = "noResponsible";
    } else if (hasResponsible) {
      status = "inProgress";
    } else {
      status = "noResponsible";
    }

    return {
      id: req.humanResourceRequestNumber,
      title: req.humanResourceRequestType,
      requestDate: formatDate(req.humanResourceRequestDate),
      responsible: hasResponsible
        ? `${req.staffName} ${req.staffLastName}`.trim()
        : "Sin responsable",
      status,
      taskName: tasks.map((t) => t.taskName).join(", ") || "Sin tareas",
      employeeName: req.names?.trim() || "",
      surnames: req.surnames || "",
    };
  });
};
