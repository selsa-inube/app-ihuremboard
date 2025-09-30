import { TaskNameMapping } from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";
import { Status } from "./types";
import { HumanEmployeeResourceRequest } from "@ptypes/humanEmployeeResourcesRequest.types";

export const formatHumanResourceRequests = (
  requests: HumanEmployeeResourceRequest[],
  employeeId?: string,
  referenceDate: Date = new Date(),
) => {
  const filtered = employeeId
    ? requests.filter((req) => req.employeeId === employeeId)
    : requests;

  return filtered.map((req) => {
    const allExecuted = req.taskStatus.toString() === "executed";
    const hasUnassignedTask =
      req.taskStatus.toString() === "assigned" &&
      !req.staffName &&
      !req.staffLastName &&
      !req.staffIdentificationDocumentNumber;
    const hasResponsible = req.staffName && req.staffLastName;

    const requestDate = new Date(req.humanResourceRequestDate);
    const sameMonthAndYear =
      requestDate.getMonth() === referenceDate.getMonth() &&
      requestDate.getFullYear() === referenceDate.getFullYear();

    let status: Status = "noResponsible";
    if (allExecuted && sameMonthAndYear) {
      status = "completed";
    } else if (hasUnassignedTask) {
      status = "noResponsible";
    } else if (hasResponsible) {
      status = "inProgress";
    }

    return {
      id: req.humanResourceRequestNumber,
      title: req.humanResourceRequestType,
      requestDate: formatDate(req.humanResourceRequestDate),
      responsible: hasResponsible
        ? `${req.staffName} ${req.staffLastName}`.trim()
        : "Sin responsable",
      status,
      taskName:
        TaskNameMapping[req.taskName as keyof typeof TaskNameMapping] ??
        req.taskName ??
        "Sin tarea",
      employeeName: req.names?.trim() ?? "",
      surnames: req.surnames ?? "",
    };
  });
};
