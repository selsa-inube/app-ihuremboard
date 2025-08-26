interface IBusinessUnit {
  abbreviatedName: string;
  businessUnitPublicCode: string;
  descriptionUse: string;
  firstMonthOfFiscalYear: string;
  languageId: string;
  urlLogo: string;
}

interface IOptionsByEmployeePortalBusinessManager {
  optionEmployeeId: string;
  employeePortalCatalogId: string;
  employeePortalId: string;
}

interface IEmployeePortalByBusinessManager {
  abbreviatedName: string;
  businessManagerId: string;
  businessUnit: string;
  descriptionUse: string;
  portalCode: string;
  employeePortalCatalogId: string;
  employeePortalId: string;
  optionsByEmployeePortalBusinessManager?: IOptionsByEmployeePortalBusinessManager[];
}

interface IBusinessManager {
  id: string;
  publicCode: string;
  language: string;
  abbreviatedName: string;
  description: string;
  urlBrand: string;
  urlLogo: string;
  customerId: string;
}
export enum EContractStatus {
  in_the_process_of_formalization = "in_the_process_of_formalization",
  formalized = "formalized",
  finalized = "finalized",
  in_the_process_of_ending = "in_the_process_of_ending",
}

export type {
  IBusinessManager,
  IEmployeePortalByBusinessManager,
  IOptionsByEmployeePortalBusinessManager,
  IBusinessUnit,
};
