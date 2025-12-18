import { environment } from "@config/environment";
import { mapRequestBody } from "@services/humanResourcesRequest/deleteHumanResourceRequest/mappers";

import { IDeleteResponse } from "./types";

export async function deleteHumanResourceRequest(
  id: string,
  justification: string,
  number: string,
  headers: Record<string, string>,
): Promise<IDeleteResponse> {
  const body = mapRequestBody(id, justification, number);
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "DELETE",
      headers: {
        ...headers,
        "X-Action": "RemoveHumanResourcesRequest",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message ?? `Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}
