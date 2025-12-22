import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Logger } from "@utils/logger";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { deleteHumanResourceRequest } from "@services/humanResourcesRequest/deleteHumanResourceRequest";

const ERROR_CODE_DELETE_FAILED = 1009;

export function useDeleteRequest<T extends { requestId?: string }>(
  updateStateFunction: (filterFn: (item: T) => boolean) => void,
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const handleDelete = async (
    id: string,
    justification: string,
    number: string,
    idField: keyof T = "requestId",
  ) => {
    setIsDeleting(true);
    try {
      const headers = await getHeaders();
      await deleteHumanResourceRequest(id, justification, number, headers);
      updateStateFunction((item: T) => item[idField] !== id);

      navigate(location.pathname, {
        state: {
          showFlag: true,
          flagTitle: "Solicitud Descartada",
          flagMessage: "La solicitud se canceló correctamente",
          isSuccess: true,
        },
        replace: true,
      });

      return true;
    } catch (error) {
      Logger.error("Error al eliminar la solicitud", error as Error, {
        id,
        justification,
        number,
      });
      const errorConfig = modalErrorConfig[ERROR_CODE_DELETE_FAILED];

      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(error)}`,
        solutionText: errorConfig.solutionText,
      });

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
