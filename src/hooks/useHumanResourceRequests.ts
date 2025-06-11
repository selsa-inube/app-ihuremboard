import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import {
  HumanResourceRequest,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorFlag } from "./useErrorFlag";

type RequestType = keyof typeof ERequestType;

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  typeRequest?: RequestType,
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();

  useErrorFlag(
    flagShown,
    typeRequest
      ? `Error al obtener solicitudes de tipo "${ERequestType[typeRequest]}"`
      : "Error al obtener solicitudes",
    "Error en la solicitud",
    false,
  );

  const fetchData = async () => {
    setIsLoading(true);
    setFlagShown(false);
    try {
      const headers = await getHeaders();
      const requests = await getHumanResourceRequests("", headers, typeRequest);
      setData(formatData(requests ?? []));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setFlagShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [typeRequest]);

  return { data, isLoading, error, refetch: fetchData };
};
