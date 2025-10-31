import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";

import { mapHumanResourceRequestApiToEntity } from "../mappers";

const getHumanResourceRequests = async (
  humanResourceRequestNumber: string,
  headers: Record<string, string>,
): Promise<HumanResourceRequest> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        humanResourceRequestNumber,
      });

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
        return {} as HumanResourceRequest;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener la solicitud de recursos humanos (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return mapHumanResourceRequestApiToEntity(data[0]);
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          "Error al obtener la solicitud de recursos humanos:",
          error,
        );
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener la solicitud de recursos humanos.",
        );
      }
    }
  }

  return {} as HumanResourceRequest;
};

export { getHumanResourceRequests };
