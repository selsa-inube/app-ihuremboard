import {
  ETaskStatus,
  ERequestType,
  TaskNameMapping,
  HumanResourceRequestBlockingPerTask,
} from "./humanResourcesRequest.types";

export interface HumanEmployeeResourceRequest {
  description: string;
  employeeId: string;
  employeeStatus: string;
  humanResourceRequestBlockingPerTasks: HumanResourceRequestBlockingPerTask[];
  humanResourceRequestDate: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestType: ERequestType;
  identificationDocumentNumber: string;
  identificationType: string;
  names: string;
  positionName: string;
  staffIdentificationDocumentNumber: string;
  staffLastName: string;
  staffName: string;
  surnames: string;
  taskCode: string;
  taskManagingId: string;
  taskName: keyof typeof TaskNameMapping;
  taskStatus: ETaskStatus;
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

export type HumanEmployeeResourceRequests = HumanEmployeeResourceRequest[];
