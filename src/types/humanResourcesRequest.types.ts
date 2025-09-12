export interface HumanResourceRequest {
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestDescription: string;
  humanResourceRequestDate: string;
  humanResourceRequestStatus: ERequestStatus;
  humanResourceRequestType: ERequestType;
  humanResourceRequestData: HumanResourceRequestData;
  employeeId: string;
  employeeName: string;
  employeeStatus: string;
  identificationDocumentNumber: string;
  identificationType: string;
  names: string;
  surnames: string;
  positionName: string;
  staffIdentificationDocumentNumber: string;
  staffLastName: string;
  staffName: string;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
  humanResourceRequestBlockingPerTasks: HumanResourceRequestBlockingPerTask[];
}
export interface HumanResourceRequestTraceability {
  traceabilityId: string;
  humanResourceRequestId: string;
  actionExecuted: string;
  userWhoExecutedAction: string;
  executionDate: string;
  description: string;
}

export interface TaskToManageHumanResourceRequest {
  taskManagingId: string;
  humanResourceRequestId: string;
  taskCode: string;
  taskName: string;
  taskStatus: ETaskStatus;
  description: string;
}

export interface HumanResourceRequestBlockingPerTask {
  blockType: string;
  description: string;
  errorId: string;
  registrationDate: string;
  taskManagingId: string;
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
  assigned = "Asignada",
  executed = "Ejecutada",
  manually_locked = "Bloqueada Manualmente",
  system_locked = "Bloqueada por Sistema",
}

export enum ERequestStatus {
  closed = "Cerrada",
  rejected = "Rechazada",
  canceled = "Cancelada",
  supervisor_approval = "Aprobacion Jefe Inmediato",
  HR_compliance_verification = "Verificacion en Gestion Humana",
  confirmation_of_vacation_taken = "Confirmacion Disfrute de vacaciones",
  successfully_processed = "Tramitada con Exito",
  certification_generation = "Generacion de la certificacion",
  onboarding_in_progress = "Vinculación en Progreso",
  pending_registration_invitation = "Pendiente de Invitacion para registro",
  pending_to_complete_registration = "Pendiente de completar registro",
}

export type HumanResourceRequests = HumanResourceRequest[];
