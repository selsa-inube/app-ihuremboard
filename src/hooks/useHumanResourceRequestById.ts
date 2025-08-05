import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest/getHumanResoursceByNumber";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";

export const useHumanResourceRequest = (
  requestNumber: string | null | undefined,
) => {
  const [data, setData] = useState<HumanResourceRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();
  const { selectedClient } = useAppContext();

  useErrorFlag({ flagShown });

  const fetchData = async () => {
    if (!requestNumber || !selectedClient?.id) return;

    setIsLoading(true);
    setFlagShown(false);

    try {
      const headers = await getHeaders();
      const response = await getHumanResourceRequests(requestNumber, headers);

      if (!response || Object.keys(response).length === 0) {
        setError(404);
        return;
      }
      setData(response);
    } catch {
      setError(500);
      setFlagShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestNumber, selectedClient?.id]);

  return { data, isLoading, error, refetch: fetchData };
};
