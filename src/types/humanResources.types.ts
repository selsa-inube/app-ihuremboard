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
