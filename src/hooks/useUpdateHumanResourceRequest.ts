import { useState, useCallback } from "react";
import { updateHumanResourceRequest } from "@services/humanResources/updateHumanResourceRequest";
// 👇 Importamos solo como tipo, así evitamos cualquier colisión de tiempo de ejecución
import type { IHumanResourceRequestResponse } from "@services/humanResources/updateHumanResourceRequest/types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorFlag } from "@hooks/useErrorFlag";

// 🧩 Creamos un tipo seguro que nunca se infiera como any
type HumanResourceResponseSafe = {
  [K in keyof IHumanResourceRequestResponse]: IHumanResourceRequestResponse[K];
};

interface UseUpdateHumanResourceRequestResult {
  updateRequest: (
    requestId: string,
    actionExecuted: string,
    description: string,
    userWhoExecutedAction: string,
    businessUnit?: string,
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  data: HumanResourceResponseSafe | null;
}

export const useUpdateHumanResourceRequest =
  (): UseUpdateHumanResourceRequestResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ El tipo mapeado asegura que ESLint y TS no lo interpreten como any
    const [data, setData] = useState<HumanResourceResponseSafe | null>(null);

    const { getHeaders } = useHeaders();

    useErrorFlag({ flagShown: Boolean(error), message: error ?? undefined });

    const updateRequest = useCallback(
      async (
        requestId: string,
        actionExecuted: string,
        description: string,
        userWhoExecutedAction: string,
        businessUnit?: string,
      ) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
          const headers = await getHeaders();
          const bu = businessUnit ?? headers["X-Business-Unit"];

          const response = await updateHumanResourceRequest(
            requestId,
            actionExecuted,
            description,
            userWhoExecutedAction,
            bu,
          );

          // ✅ Forzamos el tipo a la interfaz mapeada (nunca any)
          setData(response as HumanResourceResponseSafe);
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Ocurrió un error al actualizar la solicitud";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      },
      [getHeaders],
    );

    return { updateRequest, loading, error, data };
  };
