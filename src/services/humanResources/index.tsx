import { environment } from "@config/environment";
import { IEvaluateResponsibleOfTasks } from "@ptypes/humanResources.types";
import { Logger } from "@utils/logger";

import { mapEvaluateResponsibleOfTasksApiToEntity } from "./mappers";

export async function postEvaluateResponsibleOfTasks(
  requestBody: { humanResourceRequestId: string },
  headers: Record<string, string>,
): Promise<IEvaluateResponsibleOfTasks[]> {
  const response = await fetch(
    `${environment.IVITE_IHUREM_PERSISTENCE_PROCESS_SERVICE}/human-resources-requests`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "X-Action": "EvaluateResponsibleOfTasks",
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (response.status === 204) {
    return [];
  }

  if (!response.ok) {
    let errorMessage = "Unexpected error";
    try {
      const error = await response.json();
      errorMessage = error.message ?? errorMessage;
    } catch (err: unknown) {
      const normalizedError =
        err instanceof Error ? err : new Error("Unknown error parsing JSON");

      Logger.error(
        "Error parsing JSON in postEvaluateResponsibleOfTasks",
        normalizedError,
        {
          module: "postEvaluateResponsibleOfTasks",
          requestBody,
          headers,
        },
      );
    }
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }

  const data = await response.json();
  return Array.isArray(data)
    ? data.map(mapEvaluateResponsibleOfTasksApiToEntity)
    : [];
}
