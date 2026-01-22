import { environment } from "@config/environment";
import { Logger } from "@utils/logger";
import { IPatchDisbursementRequestBody } from "./types";

export async function patchHumanResourceDisbursement(
  requestBody: IPatchDisbursementRequestBody,
  headers: Record<string, string>,
) {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "X-Action": "UpdateHumanResourcesRequest",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData?.message ?? `HTTP ${response.status}: ${response.statusText}`;

    Logger.error(
      "Error al actualizar la fecha de desembolso",
      new Error(errorMessage),
      {
        status: response.status,
        requestBody,
        responseBody: errorData,
      },
    );

    throw new Error(errorMessage);
  }

  return response.json();
}
