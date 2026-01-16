import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";
import { mapUseCasesApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

const getUseCasesByStaff = async (
  userName: string,
  businessManagerCode: string,
  businessUnitCode: string,
  headers?: Record<string, string>,
): Promise<IUseCasesByRole> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const requestHeaders = {
        ...headers,
        "X-Action": "SearchUseCaseForStaff",
        "X-User-Name": userName,
      };

      const params = new URLSearchParams({
        businessManagerCode,
        businessUnitCode,
      });

      const url = `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${params.toString()}`;

      const res = await fetch(url, {
        method: "GET",
        headers: requestHeaders,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(
          `Error al consultar casos de uso (Status: ${res.status})`,
        );
      }

      const contentLength = res.headers.get("content-length");
      if (res.status === 204 || contentLength === "0") {
        return { listOfUseCasesByRoles: [] };
      }

      const data = await res.json();
      return mapUseCasesApiToEntity(data);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));

      if (attempt === maxRetries) {
        Logger.error(
          "Error obteniendo casos de uso del staff después de varios intentos",
          error,
          {
            module: "getUseCasesByStaff",
            attempt,
            userName,
            businessManagerCode,
            businessUnitCode,
          },
        );
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los casos de uso del usuario.",
        );
      }
    }
  }

  return { listOfUseCasesByRoles: [] };
};

export { getUseCasesByStaff };
