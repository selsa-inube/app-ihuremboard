import { environment } from "@config/environment";
import { mapRequestBody } from "@services/humanResourcesRequest/deleteHumanResourceRequest/mappers";
import { IDeleteResponse } from "./types";

const MAX_RETRIES = 3;
const REQUEST_TIMEOUT = 10000;

export async function deleteHumanResourceRequest(
  id: string,
  justification: string,
  number: string,
  headers: Record<string, string>,
): Promise<IDeleteResponse> {
  const body = mapRequestBody(id, justification, number);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(
        `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
        {
          method: "DELETE",
          headers: {
            ...headers,
            "X-Action": "RemoveHumanResourcesRequest",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.message ?? `Error: ${response.status}`;

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (attempt === MAX_RETRIES) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error("Error inesperado al eliminar la solicitud");
}
