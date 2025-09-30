import { useEffect, useState } from "react";
import { getHumanDecisionTasks } from "@services/humanResources/getHumanResources";

interface IHumanDecisionTasksResponse {
  decisions: string[];
  status: string;
}

export function useHumanDecisionTasks(
  requestType: string,
  headers: Record<string, string>,
  enabled = true,
) {
  const [data, setData] = useState<IHumanDecisionTasksResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !requestType) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getHumanDecisionTasks(requestType, headers);
        setData(response);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestType, headers, enabled]);

  return { data, loading, error };
}
