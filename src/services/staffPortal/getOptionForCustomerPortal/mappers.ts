import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";

const mapOptionForCustomerPortalApiToEntity = (
  resend: Record<string, string | number | object>,
): IOptionWithSubOptions => {
  const buildResend: IOptionWithSubOptions = {
    abbreviatedName: resend.abbreviatedName as string,
    descriptionUse: resend.descriptionUse as string,
    optionStaffId: resend.optionStaffId as string,
    parentOptionId: resend.parentOptionId as string,
    publicCode: resend.publicCode as string,
    subOption: Array.isArray(resend.subOption)
      ? resend.subOption.map((subOption) => ({
          abbreviatedName: subOption.abbreviatedName as string,
          descriptionUse: subOption.descriptionUse as string,
          optionStaffId: subOption.optionStaffId as string,
          publicCode: subOption.publicCode as string,
          subOption: subOption.subOption as string[],
          useCaseName: subOption.useCaseName as string,
        }))
      : [],
    useCaseName: resend.useCaseName as string,
  };

  return buildResend;
};

const mapOptionForCustomerPortalApiToEntities = (
  resend: Record<string, string | number | object>[],
): IOptionWithSubOptions[] => {
  return resend.map(mapOptionForCustomerPortalApiToEntity);
};

export {
  mapOptionForCustomerPortalApiToEntities,
  mapOptionForCustomerPortalApiToEntity,
};
