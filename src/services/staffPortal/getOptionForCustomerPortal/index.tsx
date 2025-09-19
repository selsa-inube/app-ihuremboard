import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";

import { mapOptionForCustomerPortalApiToEntities } from "./mappers";

const getOptionForCustomerPortal = async (
  staffPortalPublicCode: string,
  businessUnitPublicCode: string,
): Promise<IOptionWithSubOptions[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        staffPortalPublicCode,
        businessUnitPublicCode,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "x-action": "SearchOptionsStaffPortalByBusinessUnit",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/staff-portals-by-business-manager?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [] as IOptionWithSubOptions[];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del portal",
          status: res.status,
          data,
        };
      }

      return Array.isArray(data)
        ? mapOptionForCustomerPortalApiToEntities(data)
        : [];
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del portal.",
        );
      }
    }
  }

  return [] as IOptionWithSubOptions[];
};

export { getOptionForCustomerPortal };
