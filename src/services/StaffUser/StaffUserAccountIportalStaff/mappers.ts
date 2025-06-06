import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";

const mapStaffUserAccountApiToEntity = (
  data: Record<string, string | number | object>,
): IStaffUserAccount => {
  const mappedUserAccount: IStaffUserAccount = {
    biologicalSex:
      typeof data.biologicalSex === "string" ? data.biologicalSex : "",
    birthDay:
      typeof data.birthDay === "string" && !isNaN(Date.parse(data.birthDay))
        ? new Date(data.birthDay)
        : new Date(),
    businessManagerCode:
      typeof data.businessManagerCode === "string"
        ? data.businessManagerCode
        : "",
    businessManagerName:
      typeof data.businessManagerName === "string"
        ? data.businessManagerName
        : "",
    identificationDocumentNumber:
      typeof data.identificationDocumentNumber === "string"
        ? data.identificationDocumentNumber
        : "",
    identificationTypeNaturalPerson:
      typeof data.identificationTypeNaturalPerson === "string"
        ? data.identificationTypeNaturalPerson
        : "",
    missionName: typeof data.missionName === "string" ? data.missionName : "",
    staffId: typeof data.staffId === "string" ? data.staffId : "",
    staffName: typeof data.staffName === "string" ? data.staffName : "",
    userAccount:
      typeof data.identificationDocumentNumber === "string"
        ? data.identificationDocumentNumber
        : "",
    principalEmail:
      typeof data.principalEmail === "string" ? data.principalEmail : "",
    principalPhone:
      typeof data.principalPhone === "string" ? data.principalPhone : "",
  };

  return mappedUserAccount;
};

const mapStaffUserAccountApiToEntities = (
  data: Record<string, string | number | object>[],
): IStaffUserAccount[] => {
  return data.map(mapStaffUserAccountApiToEntity);
};

export { mapStaffUserAccountApiToEntity, mapStaffUserAccountApiToEntities };
