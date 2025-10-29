import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";

import { mapBusinessUnitsApiToEntity } from "./mappers";

const getBusinessUnitsForOfficer = async (
  userAccount: string,
  portalPublicCode: string,
  headers: Record<string, string>,
): Promise<IBusinessUnit[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

    try {
      const options: RequestInit = {
        method: "GET",
        headers: {
          ...headers,
          "X-Action": "SearchBusinessUnitsForAnOfficer",
        },
        signal: controller.signal,
      };

      const url = `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/business-units-portal-staff/${userAccount.substring(0, 20)}/${portalPublicCode}`;
      const res = await fetch(url, options);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ??
          `Error al obtener las unidades de negocio para el oficial. Código: ${res.status}`;
        throw new Error(errorMessage);
      }

      return data.map(mapBusinessUnitsApiToEntity);
    } catch (error: unknown) {
      if (attempt === maxRetries) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener las unidades de negocio.`,
        );
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return [];
};

export { getBusinessUnitsForOfficer };
