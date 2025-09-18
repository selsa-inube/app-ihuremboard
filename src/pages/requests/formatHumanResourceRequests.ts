import {
  HumanResourceRequest,
  ETaskStatus,
  TaskToManageHumanResourceRequest,
  HumanResourceRequestBlockingPerTask,
} from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

export type Status = "noResponsible" | "blocked" | "inProgress" | "completed";

export const formatHumanResourceRequests = (
  requests: HumanResourceRequest[],
  currentDate: Date = new Date(),
) => {
  return requests.map((req) => {
    const tasks: TaskToManageHumanResourceRequest[] =
      req.tasksToManageTheHumanResourcesRequests || [];
    const blocks: HumanResourceRequestBlockingPerTask[] =
      req.humanResourceRequestBlockingPerTasks || [];
    const hasResponsible =
      !!req.staffName?.trim() &&
      !!req.staffLastName?.trim() &&
      !!req.staffIdentificationDocumentNumber?.trim();

    const hasAssignedTask = tasks.some(
      (t) => t.taskStatus === ETaskStatus.assigned,
    );
    const isNoResponsible = !hasResponsible && hasAssignedTask;

    const isBlocked =
      tasks.some(
        (t) =>
          t.taskStatus === ETaskStatus.manually_locked ||
          t.taskStatus === ETaskStatus.system_locked,
      ) || blocks.length > 0;

    const allExecuted =
      tasks.length > 0 &&
      tasks.every((t) => t.taskStatus === ETaskStatus.executed);
    const isCompleted =
      allExecuted &&
      isSameMonth(new Date(req.humanResourceRequestDate), currentDate);

    let status: Status;
    if (isNoResponsible) status = "noResponsible";
    else if (isBlocked) status = "blocked";
    else if (isCompleted) status = "completed";
    else status = "inProgress";

    return {
      id: req.humanResourceRequestNumber,
      title: req.humanResourceRequestType,
      requestDate: formatDate(req.humanResourceRequestDate),
      responsible: hasResponsible
        ? `${req.staffName} ${req.staffLastName}`.trim()
        : "Sin responsable",
      status,
      employeeName: req.names?.trim() || "",
      surnames: req.surnames || "",
      tasks,
      blocks,
    };
  });
};

function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth()
  );
}
