export interface IApprovalRequestBody {
  actionExecuted: string;
  description: string;
  humanResourceRequestId: string;
  taskManagingId: string;
  userWhoExecutedAction: string;
}

export interface IHumanResourceRequestBlockingPerTask {
  blockType: string;
  description: string;
  errorId: string;
  registrationDate: string;
  taskManagingId: string;
  transactionOperation: string;
}

export interface ITaskToManageHumanResourcesRequest {
  description: string;
  humanResourceRequestBlockingPerTask: IHumanResourceRequestBlockingPerTask[];
  humanResourceRequestId: string;
  identificationDocumentNumber: string;
  positionName: string;
  staffLastName: string;
  staffName: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: string;
  transactionOperation: string;
}

export interface IHumanResourceRequestTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  transactionOperation: string;
  userWhoExecutedAction: string;
}

export interface IApprovalResponse {
  employeeId: string;
  humanResourceRequestData: string;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: string;
  humanResourceRequestTraceabilities: IHumanResourceRequestTraceability[];
  humanResourceRequestType: string;
  modifyJustification: string;
  tasksToManageTheHumanResourcesRequests: ITaskToManageHumanResourcesRequest[];
}

export enum ApprovalAction {
  CONFIRM_PERIOD = "confirm_the_period_of_use",
  CANCEL_REQUEST = "cancel_the_request_at_employees_request",
}
