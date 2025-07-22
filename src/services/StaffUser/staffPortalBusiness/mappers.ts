import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";

const mapUseCasesApiToEntity = (
  data: Record<string, string | number | object>,
): IUseCasesByRole => {
  return {
    listOfUseCasesByRoles: Array.isArray(data.listOfUseCases)
      ? data.listOfUseCases.map(String)
      : [],
  };
};

const mapUseCasesApiToEntities = (
  data: Record<string, string | number | object>[],
): IUseCasesByRole[] => {
  return data.map(mapUseCasesApiToEntity);
};

export { mapUseCasesApiToEntity, mapUseCasesApiToEntities };
