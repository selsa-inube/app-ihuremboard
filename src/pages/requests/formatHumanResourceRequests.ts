import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

import { Status } from "./types";

export const formatHumanResourceRequests = (
  requests: HumanResourceRequest[],
  employeeId?: string,
) => {
  const filtered = employeeId
    ? requests.filter((req) => req.employeeId === employeeId)
    : requests;

  return filtered.map((req) => {
    const statusRaw = req.humanResourceRequestStatus?.toLowerCase();
    const hasResponsible = !!req.userCodeInCharge;
    const isFinalized = ["closed", "rejected", "canceled"].includes(statusRaw);

    let status: Status;

    if (isFinalized) {
      status = "completed";
    } else if (hasResponsible) {
      status = "inProgress";
    } else {
      status = "pending";
    }

    return {
      id: req.humanResourceRequestNumber,
      title: req.humanResourceRequestType,
      requestDate: formatDate(req.humanResourceRequestDate),
      responsible: req.userNameInCharge,
      hasResponsible,
      status,
      employeeName: req.employeeName,
    };
  });
};
