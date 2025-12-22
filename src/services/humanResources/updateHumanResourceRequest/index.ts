import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IHumanResourceRequestResponse } from "@ptypes/humanResources.types";
import { mapHumanResourceRequestApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

const updateHumanResourceRequest = async (
  requestId: string,
  actionExecuted: string,
  description: string,
  userWhoExecutedAction: string,
  businessUnit: string,
): Promise<IHumanResourceRequestResponse> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const body = {
        humanResourceRequestId: requestId,
        modifyJustification: description,
        humanResourceRequestTraceabilities: [
          {
            actionExecuted,
            description,
            executionDate: new Date().toISOString(),
            transactionOperation: "Insert",
            userWhoExecutedAction,
          },
        ],
      };

      const options: RequestInit = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Action": "UpdateHumanResourcesRequest",
          "X-Business-Unit": businessUnit,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
        options,
      );

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al actualizar la solicitud";
        throw new Error(errorMessage);
      }

      return mapHumanResourceRequestApiToEntity(data);
    } catch (err: unknown) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      Logger.error(
        `Intento ${attempt} fallido al actualizar la solicitud`,
        normalizedError,
        {
          module: "updateHumanResourceRequest",
          requestId,
          actionExecuted,
          businessUnit,
          attempt,
        },
      );

      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo actualizar la solicitud.",
        );
      }
    }
  }

  throw new Error("Error desconocido al actualizar la solicitud.");
};

export { updateHumanResourceRequest };
