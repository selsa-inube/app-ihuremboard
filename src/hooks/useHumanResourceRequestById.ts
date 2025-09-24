import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest/getHumanResoursceByNumber";
import {
  HumanResourceRequest,
  HumanResourceRequestData,
} from "@ptypes/humanResourcesRequest.types";
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
    console.log("🔹 FetchData llamado con requestNumber:", requestNumber);
    console.log("🔹 selectedClient.id:", selectedClient?.id);

    if (!requestNumber) return;

    setIsLoading(true);
    setFlagShown(false);

    try {
      const headers = await getHeaders();
      console.log("🔹 Headers enviados:", headers);

      const response = await getHumanResourceRequests(requestNumber, headers);
      console.log("🔹 Respuesta API:", response);

      if (!response || Object.keys(response).length === 0) {
        setError(404);
        console.warn("⚠️ Respuesta vacía de la API");
        return;
      }

      if (
        response.humanResourceRequestData &&
        typeof response.humanResourceRequestData === "string"
      ) {
        response.humanResourceRequestData = JSON.parse(
          response.humanResourceRequestData,
        ) as HumanResourceRequestData;
      }

      setData(response);
    } catch (err) {
      console.error("❌ Error fetch:", err);
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
