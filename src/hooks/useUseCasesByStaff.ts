import { useEffect, useState } from "react";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";
import { useErrorFlag } from "./useErrorFlag";

interface UseCasesProps {
  userName: string;
  businessManagerCode: string;
  businessUnitCode: string;
  onUseCasesLoaded?: (useCases: IUseCasesByRole[]) => void;
}

export const useUseCasesByStaff = ({
  userName,
  businessManagerCode,
  businessUnitCode,
  onUseCasesLoaded,
}: UseCasesProps) => {
  const [useCases, setUseCases] = useState<IUseCasesByRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<number | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  useErrorFlag(flagShown);

  useEffect(() => {
    const fetchUseCases = async () => {
      console.log("Ejecutando fetch con:", {
        userName,
        businessManagerCode,
        businessUnitCode,
      });

      if (!userName || !businessManagerCode || !businessUnitCode) {
        console.warn("FALTAN PARÁMETROS para obtener casos de uso", {
          userName,
          businessManagerCode,
          businessUnitCode,
        });
        setHasError(400);
        setUseCases([]);
        return;
      }

      setLoading(true);
      setHasError(null);

      try {
        const data = await getUseCasesByStaff(
          userName,
          businessManagerCode,
          businessUnitCode,
        );

        setUseCases(data);
        onUseCasesLoaded?.(data);
      } catch (error) {
        console.error("Error al obtener los casos de uso:", error);
        setHasError(500);
        setFlagShown(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUseCases();
  }, [userName, businessManagerCode, businessUnitCode, onUseCasesLoaded]);

  return { useCases, loading, hasError };
};
