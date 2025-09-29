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
