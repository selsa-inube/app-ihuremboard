import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { IBusinessManager } from "@ptypes/employeePortalBusiness.types";

import { mapBusinessManagerApiToEntity } from "./mappers";

const getBusinessManagerByCode = async (
  businessManagerCode: string,
): Promise<IBusinessManager> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllBusinessManager",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/business-managers?publicCode=${businessManagerCode}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IBusinessManager;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del operador",
          status: res.status,
          data,
        };
      }

      const businessManager =
        Array.isArray(data) && data.length > 0 ? data[0] : data;

      return mapBusinessManagerApiToEntity(businessManager);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener los datos del operador. Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
      continue;
    }
  }

  return {} as IBusinessManager;
};

export { getBusinessManagerByCode };
