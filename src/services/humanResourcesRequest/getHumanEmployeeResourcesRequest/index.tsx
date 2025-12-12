import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { mapHumanEmployeeResourceRequestApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

const getHumanEmployeeResourceRequests = async (
  headers: Record<string, string>,
) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        page: "1",
        per_page: "374",
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
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener las solicitudes de recursos humanos (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return Array.isArray(data)
        ? data.map((item) => mapHumanEmployeeResourceRequestApiToEntity(item))
        : [];
    } catch (err: unknown) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener las solicitudes de recursos humanos después de varios intentos",
          normalizedError,
          { module: "getHumanEmployeeResourceRequests", attempt },
        );
        throw normalizedError;
      }
    }
  }

  return [];
};

export { getHumanEmployeeResourceRequests };
