import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";

const mapUseCasesApiToEntity = (
  data: Record<string, unknown>,
): IUseCasesByRole => {
  return {
    listOfUseCasesByRoles: Array.isArray(data.listOfUseCasesByRoles)
      ? data.listOfUseCasesByRoles.map(String)
      : [],
  };
};

const mapUseCasesApiToEntities = (
  data: Record<string, unknown>[],
): IUseCasesByRole[] => {
  return data.map(mapUseCasesApiToEntity);
};

export { mapUseCasesApiToEntity, mapUseCasesApiToEntities };
