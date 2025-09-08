import { IBusinessManager } from "@ptypes/employeePortalBusiness.types";
import { encrypt } from "@utils/encrypt";

const mapBusinessManagerApiToEntity = (
  businessManager: Record<string, unknown>,
): IBusinessManager => {
  const toStringSafe = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  };

  const business: IBusinessManager = {
    businessManagerCode: toStringSafe(businessManager.businessManagerCode),
    publicCode: toStringSafe(businessManager.publicCode),
    language: toStringSafe(businessManager.languageId),
    abbreviatedName: toStringSafe(businessManager.abbreviatedName),
    description: toStringSafe(businessManager.descriptionUse),
    urlBrand: toStringSafe(businessManager.urlBrand),
    urlLogo: toStringSafe(businessManager.urlLogo),
    customerId: toStringSafe(businessManager.customerId),
    clientId: encrypt(toStringSafe(businessManager.clientId)),
    clientSecret: encrypt(toStringSafe(businessManager.clientSecret)),
  };

  return business;
};

export { mapBusinessManagerApiToEntity };
