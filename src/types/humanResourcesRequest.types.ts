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
  taskName: keyof typeof TaskNameMapping;
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
  taskName: keyof typeof TaskNameMapping;
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
export interface HumanResourceRequestData {
  contractId?: string;
  contractNumber?: string;
  businessName?: string;
  startDate?: string;
  contractType?: string;
  observationEmployee?: string;
  daysToPay?: string | number;
  disbursementDate?: string;
  daysOff?: string | number;
  startDateEnyoment?: string;
  certificationType?: string;
  addressee?: string;
}

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
  assigned = "assigned",
  executed = "executed",
  pending = "PENDING",
  completed = "COMPLETED",
  failed = "FAILED",
}

export enum EContractType {
  FixedTermContract = "Contrato a término fijo",
  IndefiniteTermContract = "Contrato a término indefinido",
  ApprenticeshipContract = "Contrato de aprendizaje",
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

export enum TaskNameMapping {
  update_personal_details = "Actualizar datos generales del Empleado",
  update_contact_information = "Actualizar datos de contacto del empleado",
  update_onboarding_information = "Actualizar datos de vinculación",
  health_screening_management = "Gestionar exámenes médicos",
  update_employee_references = "Actualizar referencias del empleado",
  update_compensation_info = "Actualizar asignaciones de la remuneración del empleado",
  manage_signatures = "Gestionar firmas",
  manage_user_accounts_for_office_applications = "Gestionar cuentas de usuario para aplicaciones de oficina",
  manage_social_security_enrollment = "Gestionar Afiliacion a Seguridad Social",
  confirm_start_date = "Confirmar fecha de inicio laboral",
  approve_request = "Aprobar Solicitud",
  verify_viability_of_request = "Verificar viabilidad de la solicitud",
  confirm_vacation_completion = "Confirmar el disfrute de las vacaciones",
  generate_certification = "Generar certificación",
  send_self_registration_invitation_to_email = "Enviar invitacion de autoregistro al correo",
  monitor_completed_registration = "Monitorear registro completado",
}

export type HumanResourceRequests = HumanResourceRequest[];
