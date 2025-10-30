import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { mapHumanEmployeeResourceRequestApiToEntity } from "./mappers";

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
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener las solicitudes de recursos humanos.",
        );
      }
    }
  }

  return [];
};

export { getHumanEmployeeResourceRequests };
