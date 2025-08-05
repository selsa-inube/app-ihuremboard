import { useEffect } from "react";
import { useFlag } from "@inubekit/inubekit";

interface UseErrorFlagProps {
  flagShown: boolean;
  message?: string;
  title?: string;
  isSuccess?: boolean;
  duration?: number;
}

export const useErrorFlag = ({
  flagShown,
  message,
  title,
  isSuccess = false,
  duration,
}: UseErrorFlagProps) => {
  const { addFlag } = useFlag();

  useEffect(() => {
    if (flagShown) {
      addFlag({
        title: title ?? (isSuccess ? "Éxito" : "Error"),
        description:
          message ??
          (isSuccess
            ? "Solicitud enviada correctamente."
            : "Error en la consulta de los datos."),
        appearance: isSuccess ? "success" : "danger",
        duration: duration ?? 10000,
      });
    }
  }, [flagShown, message, title, isSuccess]);
};
