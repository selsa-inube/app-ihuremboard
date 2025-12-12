import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { mapHumanResourceRequestApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

const getHumanResourceRequests = async (headers: Record<string, string>) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        page: "1",
        per_page: "50",
        sort: "desc.humanResourceRequestDate",
      });

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests?${queryParameters}`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchAllEmployeeHumanResourcesRequest",
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
    } catch (err: unknown) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener las solicitudes de recursos humanos después de varios intentos",
          normalizedError,
          { module: "getHumanResourceRequests", attempt },
        );
        throw normalizedError;
      }
    }
  }

  return [];
};

export { getHumanResourceRequests };
