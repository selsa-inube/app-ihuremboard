import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import {
  IHumanDecisionTasksResponse,
  IApiErrorResponse,
} from "@ptypes/humanResources.types";
import { mapHumanDecisionTasksApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

const getHumanDecisionTasks = async (
  requestType: string,
  businessUnits: string,
): Promise<IHumanDecisionTasksResponse> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const url = `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/enumerators/human-decisions-tasks/${requestType}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Action": "GetByHumanDecisionTasks",
          "X-Business-Unit": businessUnits,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return { decisions: [], status: "No Content" };
      }

      if (!res.ok) {
        const error: IApiErrorResponse = await res.json();
        throw new Error(error.message ?? "Error al consultar decisiones.");
      }

      const data = await res.json();
      return mapHumanDecisionTasksApiToEntity(data);
    } catch (err: unknown) {
      if (attempt === maxRetries) {
        const normalizedError =
          err instanceof Error ? err : new Error("Unknown fetch error");

        Logger.error(
          "Error al obtener human decisions tasks",
          normalizedError,
          {
            module: "getHumanDecisionTasks",
            requestType,
            businessUnits,
            attempt,
          },
        );

        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener las decisiones humanas.",
        );
      }
    }
  }

  return { decisions: [], status: "Failed" };
};

export { getHumanDecisionTasks };
