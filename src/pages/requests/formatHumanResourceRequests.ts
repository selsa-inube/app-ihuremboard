import {
  HumanResourceRequest,
  ETaskStatus,
} from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

export type Status = "noResponsible" | "blocked" | "inProgress" | "completed";

export const formatHumanResourceRequests = (
  requests: HumanResourceRequest[],
  currentDate: Date = new Date(),
) => {
  return requests.map((req) => {
    const tasks = req.tasksToManageTheHumanResourcesRequests;

    const isNoResponsible =
      !req.staffName &&
      !req.staffLastName &&
      !req.identificationDocumentNumber &&
      tasks.some((task) => task.taskStatus === ETaskStatus.assigned);

    const isBlocked = tasks.some(
      (task) =>
        task.taskStatus === ETaskStatus.manually_locked ||
        task.taskStatus === ETaskStatus.system_locked,
    );

    const allExecuted =
      tasks.length > 0 &&
      tasks.every((task) => task.taskStatus === ETaskStatus.executed);

    const isCompleted =
      allExecuted &&
      isSameMonth(new Date(req.humanResourceRequestDate), currentDate);

    let status: Status;

    if (isNoResponsible) {
      status = "noResponsible";
    } else if (isBlocked) {
      status = "blocked";
    } else if (isCompleted) {
      status = "completed";
    } else {
      status = "inProgress";
    }

    return {
      id: req.humanResourceRequestNumber,
      title: req.humanResourceRequestType,
      requestDate: formatDate(req.humanResourceRequestDate),
      responsible: req.employeeName || "Sin responsable",
      status,
      employeeName: req.employeeName,
      tasks,
    };
  });
};

function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth()
  );
}
