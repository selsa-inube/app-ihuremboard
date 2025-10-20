export interface IResponsible {
  employeeId: string;
  identificationDocumentNumber: string;
  names: string;
  surnames: string;
}

export interface IEvaluateResponsibleOfTasks {
  namePosition: string;
  responsible: IResponsible[];
}

export interface IHumanDecisionTasksResponse {
  decisions: string[];
  status: string;
}

export interface IHumanDecisionTasksApi {
  decisions: string[];
  status: string;
}

export interface IApiErrorResponse {
  code: string;
  description: string;
  errors: string[];
  helpUrl: string;
  message: string;
  originalCode: string;
}

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

export enum HumanDecisionStatus {
  APPROVE_REQUEST = "approve_request",
  VERIFY_REQUEST_FEASIBILITY = "verify_request_feasibility",
  CONFIRM_PAYMENT_PROCESSING = "confirm_payment_processing",
  GENERATE_THE_CERTIFICATION = "generate_the_certification",
  CONFIRM_VACATION_COMPLETION = "confirm_vacation_completion",
}

export enum HumanDecision {
  APPROVE_THE_REQUEST = "approve_the_request",
  REJECT_THE_REQUEST_AS_UNFEASIBLE = "reject_the_request_as_unfeasible",
  MAKE_THE_REQUEST_FEASIBLE = "make_the_request_feasible",
  CANCEL_THE_REQUEST_AT_EMPLOYEES_REQUEST = "cancel_the_request_at_employees_request",
  PAYMENT_COMPLETED = "payment_completed",
  PAYMENT_DECLINED = "payment_declined",
  CERTIFICATION_GENERATED = "certification_generated",
  CERTIFICATION_DECLINED = "certification_declined",
  CONFIRM_THE_PERIOD_OF_USE = "confirm_the_period_of_use",
}

export const HumanDecisionTranslations: Record<HumanDecision, string> = {
  [HumanDecision.APPROVE_THE_REQUEST]: "Aprobar la solicitud",
  [HumanDecision.REJECT_THE_REQUEST_AS_UNFEASIBLE]:
    "Rechazar la solicitud como inviable",
  [HumanDecision.MAKE_THE_REQUEST_FEASIBLE]: "Hacer viable la solicitud",
  [HumanDecision.CANCEL_THE_REQUEST_AT_EMPLOYEES_REQUEST]:
    "Cancelar la solicitud a petición del empleado",
  [HumanDecision.PAYMENT_COMPLETED]: "Pago completado",
  [HumanDecision.PAYMENT_DECLINED]: "Pago rechazado",
  [HumanDecision.CERTIFICATION_GENERATED]: "Certificación generada",
  [HumanDecision.CERTIFICATION_DECLINED]: "Certificación rechazada",
  [HumanDecision.CONFIRM_THE_PERIOD_OF_USE]: "Confirmar el periodo de disfrute",
};
