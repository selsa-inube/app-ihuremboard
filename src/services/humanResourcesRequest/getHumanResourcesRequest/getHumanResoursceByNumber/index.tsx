import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { mapHumanResourceRequestApiToEntity } from "../mappers";
import { Logger } from "@utils/logger";

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
    } catch (err: unknown) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener la solicitud de recursos humanos después de varios intentos",
          normalizedError,
          {
            module: "getHumanResourceRequests",
            attempt,
            requestNumber: humanResourceRequestNumber,
          },
        );
        throw normalizedError;
      }
    }
  }

  return {} as HumanResourceRequest;
};

export { getHumanResourceRequests };
