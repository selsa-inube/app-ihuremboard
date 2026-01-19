import { useEffect, useState } from "react";

import { getHumanDecisionTasks } from "@services/humanResources/getHumanResources";
import { taskCodeDecisionsMap } from "@ptypes/humanResources.types";
import { useHeaders } from "@hooks/useHeaders";

interface IHumanDecisionTasksResponse {
  decisions: string[];
  status: string;
}

export function useHumanDecisionTasks(
  requestType: string,
  businessUnits: string,
  enabled = true,
  taskCode?: string,
) {
  const [data, setData] = useState<IHumanDecisionTasksResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getHeaders } = useHeaders();

  useEffect(() => {
    if (!enabled || !requestType || !businessUnits) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = await getHeaders();

        const response = await getHumanDecisionTasks(
          requestType,
          businessUnits,
          taskCode,
          headers,
        );

        if (taskCode && taskCodeDecisionsMap[taskCode]) {
          const allowedDecisions = taskCodeDecisionsMap[taskCode];
          const filteredDecisions = response.decisions.filter((decision) =>
            allowedDecisions.includes(decision.toLowerCase()),
          );
          setData({
            ...response,
            decisions: filteredDecisions,
          });
        } else {
          setData(response);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestType, businessUnits, enabled, taskCode, getHeaders]);

  return { data, loading, error };
}
