import { useEffect } from "react";
import { useFlag } from "@inubekit/inubekit";

interface UseSuccessFlagProps {
  flagShown: boolean;
  message?: string;
  title?: string;
  duration?: number;
}

export const useSuccessFlag = ({
  flagShown,
  message,
  title,
  duration,
}: UseSuccessFlagProps) => {
  const { addFlag } = useFlag();

  useEffect(() => {
    if (flagShown) {
      addFlag({
        title: title ?? "Éxito",
        description: message ?? "La acción se completó correctamente.",
        appearance: "success",
        duration: duration ?? 8000,
      });
    }
  }, [flagShown, message, title, duration]);
};
