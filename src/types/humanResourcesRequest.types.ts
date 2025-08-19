export interface HumanResourceRequestTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  userWhoExecutedAction: string;
}

export interface TaskToManageHumanResourceRequest {
  description: string;
  humanResourceRequestId: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: ETaskStatus;
}

export interface HumanResourceRequest {
  employeeId: string;
  employeeName: string;
  humanResourceRequestData: HumanResourceRequestData;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: ERequestStatus;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  humanResourceRequestType: ERequestType;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
}

export interface IVacationGeneralInformationEntry {
  id: string;
  daysOff: string;
  startDate: string;
  contract: string;
  observations: string;
  typeOfRequest?: string;
}

export interface IVacationPaymentGeneralInformationEntry {
  id: string;
  daysToPay: string;
  contract: string;
  observations: string;
}

export interface ICertificationGeneralInformationEntry {
  id: string;
  certification: string;
  addressee: string;
  contract: string;
  contractDesc: string;
  observations: string;
}

export type HumanResourceRequestData =
  | IVacationGeneralInformationEntry
  | ICertificationGeneralInformationEntry
  | IVacationPaymentGeneralInformationEntry;

export enum ERequestType {
  absence = "Ausencia",
  certification = "Certificación",
  disability = "Incapacidad",
  leave = "Permiso",
  leaving_the_job = "Retiro",
  onboarding = "Vinculación",
  paid_vacations = "Vacaciones Pagadas",
  position_transfer = "Traslado de cargo",
  pqr = "PQR",
  salary_increase = "Ascenso salarial",
  unpaid_leave = "Licencia no remunerada",
  vacations_enjoyed = "Vacaciones Disfrutadas",
}

export enum ETaskStatus {
  Assigned = "Asignada",
  Executed = "Ejecutada",
}

export enum ERequestStatus {
  canceled = "Cancelado",
  closed = "Cerrado",
  finalized = "Finalizado",
  inProgress = "En progreso",
  rejected = "Rechazado",
}

export type HumanResourceRequests = HumanResourceRequest[];
