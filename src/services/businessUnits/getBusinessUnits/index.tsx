import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";

import { mapBusinessUnitsApiToEntity } from "./mappers";

class BusinessUnitsError extends Error {
  public status: number;
  public data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "BusinessUnitsError";
    this.status = status;
    this.data = data;
  }
}

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

      const url = `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/business-units-portal-staff/${userAccount}/${portalPublicCode}`;
      const res = await fetch(url, options);

      const data = res.status !== 204 ? await res.json() : [];

      console.log("🔎 Status de respuesta:", res.status);
      console.log("🔎 Data cruda del backend:", data);

      if (!res.ok) {
        throw new BusinessUnitsError(
          `Error al obtener las unidades de negocio para el oficial. Código: ${res.status}`,
          res.status,
          data,
        );
      }

      const mappedData = data.map(mapBusinessUnitsApiToEntity).filter(Boolean);

      if (mappedData.length === 0) {
        throw new Error(
          "No se encontraron unidades de negocio para este usuario.",
        );
      }

      return mappedData;
    } catch (error: unknown) {
      if (attempt === maxRetries) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener las unidades de negocio. Error: ${errorMsg}`,
        );
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return [];
};

export { getBusinessUnitsForOfficer };
