import { useEffect, useState } from "react";
import { IResponsible } from "@ptypes/humanResources.types";
import { postEvaluateResponsibleOfTasks } from "@services/humanResources";

interface UseEvaluateResponsibleOfTasksOptions {
  requestId: string;
  headers: Record<string, string>;
  enabled?: boolean;
}

interface IEvaluateResponsibleOfTasks {
  namePosition: string;
  responsible: IResponsible[];
}

export function useEvaluateResponsibleOfTasks({
  requestId,
  headers,
  enabled = true,
}: UseEvaluateResponsibleOfTasksOptions) {
  const [data, setData] = useState<IEvaluateResponsibleOfTasks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !requestId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await postEvaluateResponsibleOfTasks(
          { humanResourceRequestId: requestId },
          headers,
        );

        setData(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId, headers, enabled]);

  return { data, loading, error };
}
