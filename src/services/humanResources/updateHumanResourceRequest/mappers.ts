import { IHumanResourceRequestResponse, ITraceability, ITask } from "./types";

interface IHumanResourceRequestApi {
  employeeId?: string;
  humanResourceRequestId?: string;
  humanResourceRequestNumber?: string;
  humanResourceRequestStatus?: string;
  humanResourceRequestType?: string;
  modifyJustification?: string;
  humanResourceRequestTraceabilities?: ITraceability[];
  tasksToManageTheHumanResourcesRequests?: ITask[];
}

const mapHumanResourceRequestApiToEntity = (
  data: IHumanResourceRequestApi,
): IHumanResourceRequestResponse => {
  return {
    employeeId: data?.employeeId ?? "",
    humanResourceRequestId: data?.humanResourceRequestId ?? "",
    humanResourceRequestNumber: data?.humanResourceRequestNumber ?? "",
    humanResourceRequestStatus: data?.humanResourceRequestStatus ?? "",
    humanResourceRequestType: data?.humanResourceRequestType ?? "",
    modifyJustification: data?.modifyJustification ?? "",
    humanResourceRequestTraceabilities:
      data?.humanResourceRequestTraceabilities?.map(
        (trace): ITraceability => ({
          actionExecuted: trace?.actionExecuted ?? "",
          description: trace?.description ?? "",
          executionDate: trace?.executionDate ?? "",
          userWhoExecutedAction: trace?.userWhoExecutedAction ?? "",
          transactionOperation: trace?.transactionOperation ?? "",
          traceabilityId: trace?.traceabilityId ?? "",
        }),
      ) ?? [],
    tasksToManageTheHumanResourcesRequests:
      data?.tasksToManageTheHumanResourcesRequests?.map(
        (task): ITask => ({
          taskName: task?.taskName ?? "",
          taskStatus: task?.taskStatus ?? "",
          description: task?.description ?? "",
          taskManagingId: task?.taskManagingId ?? "",
          taskCode: task?.taskCode ?? "",
        }),
      ) ?? [],
  };
};

export { mapHumanResourceRequestApiToEntity };
