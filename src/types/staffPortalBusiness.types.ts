import { IEmployeePortalByBusinessManager } from "./employeePortalBusiness.types";

interface IOptionsByStaffPortalBusinessManager {
  optionStaffId: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
}

interface IStaffPortalByBusinessManager
  extends IEmployeePortalByBusinessManager {
  publicCode: string;
  url: string;
  staffPortalId: string;
  optionsByStaffPortalBusinessManager: IOptionsByStaffPortalBusinessManager[];
}
interface IStaffByBusinessUnitAndRole {
  BusinessUnitName: string;
  businessUnitCode: string;
  roleName: string;
  staffId: string;
}

interface IStaffUserAccount {
  biologicalSex: string;
  birthDay: Date;
  businessManagerCode: string;
  businessManagerName: string;
  identificationDocumentNumber: string;
  identificationTypeNaturalPerson: string;
  missionName: string;
  principalEmail: string;
  principalPhone: string;
  staffByBusinessUnitAndRole?: IStaffByBusinessUnitAndRole[];
  staffId: string;
  staffName: string;
  userAccount: string;
}

interface ISubOption {
  abbreviatedName: string;
  descriptionUse: string;
  optionStaffId: string;
  publicCode: string;
  subOption: string[];
  useCaseName: string;
}

interface IOptionWithSubOptions {
  abbreviatedName: string;
  descriptionUse: string;
  optionStaffId: string;
  parentOptionId: string;
  publicCode: string;
  subOption?: ISubOption[];
  useCaseName: string;
}

export type {
  IStaffPortalByBusinessManager,
  IStaffUserAccount,
  IOptionWithSubOptions,
};
