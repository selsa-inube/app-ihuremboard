import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { mapHumanResourceRequestApiToEntity } from "./mappers";

const getHumanResourceRequestById = async (
  humanResourceRequestId: string,
  headers: Record<string, string>,
) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests/${humanResourceRequestId}/SearchByIdHumanResourcesRequest`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchByIdHumanResourcesRequest",
            ...headers,
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(
          `Error al obtener la solicitud ${humanResourceRequestId} (Status: ${res.status})`,
        );
      }

      const data = await res.json();
      return mapHumanResourceRequestApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          "Error al obtener la solicitud de recursos humanos por ID:",
          error,
        );
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener la solicitud por ID.",
        );
      }
    }
  }

  return null;
};

export { getHumanResourceRequestById };
