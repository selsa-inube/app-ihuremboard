import {
  IEvaluateResponsibleOfTasks,
  IResponsible,
} from "@ptypes/humanResources.types";

const mapResponsibleApiToEntity = (
  data: Record<string, unknown>,
): IResponsible => {
  return {
    employeeId: typeof data.employeeId === "string" ? data.employeeId : "",
    identificationDocumentNumber:
      typeof data.identificationDocumentNumber === "string"
        ? data.identificationDocumentNumber
        : "",
    names: typeof data.names === "string" ? data.names : "",
    surnames: typeof data.surnames === "string" ? data.surnames : "",
  };
};

export const mapEvaluateResponsibleOfTasksApiToEntity = (
  data: Record<string, unknown>,
): IEvaluateResponsibleOfTasks => {
  return {
    namePosition:
      typeof data.namePosition === "string" ? data.namePosition : "",
    responsible: Array.isArray(data.responsible)
      ? data.responsible.map(mapResponsibleApiToEntity)
      : [],
  };
};
