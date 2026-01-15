import { environment } from "@config/environment";

import { IApprovalRequestBody, IApprovalResponse } from "./types";

export async function postApprovalHumanResourceRequest(
  requestBody: IApprovalRequestBody,
  headers: Record<string, string>,
): Promise<IApprovalResponse> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "POST",
      headers: {
        ...headers,
        "X-Action": "ApprovalHumanResourcesRequest",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.message ?? `Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as IApprovalResponse;
  return data;
}
