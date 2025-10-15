export interface ITraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  userWhoExecutedAction: string;
  transactionOperation: string;
  traceabilityId?: string;
}

export interface ITask {
  taskName: string;
  taskStatus: string;
  description: string;
  taskManagingId: string;
  taskCode: string;
}

export interface IHumanResourceRequestResponse {
  employeeId: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: string;
  humanResourceRequestType: string;
  modifyJustification: string;
  humanResourceRequestTraceabilities: ITraceability[];
  tasksToManageTheHumanResourcesRequests: ITask[];
}
