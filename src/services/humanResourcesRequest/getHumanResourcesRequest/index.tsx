import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { mapHumanResourceRequestApiToEntity } from "./mappers";

const getHumanResourceRequests = async (
  headers: Record<string, string>,
  businessUnitId?: string,
) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        page: "1",
        per_page: "500",
        sort: "desc.humanResourceRequestDate",
      });

      if (businessUnitId) {
        queryParameters.append("businessUnitPublicCode", businessUnitId);
      }

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests?${queryParameters}`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchAllHumanResourcesRequest",
            ...headers,
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        throw new Error(
          `Error al obtener las solicitudes de recursos humanos (Status: ${res.status})`,
        );
      }

      const data = await res.json();

      return Array.isArray(data)
        ? data.map((item) => mapHumanResourceRequestApiToEntity(item))
        : [];
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener las solicitudes de recursos humanos.",
        );
      }
    }
  }

  return [];
};

export { getHumanResourceRequests };
