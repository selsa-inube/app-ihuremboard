import { useEffect, useState } from "react";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";

interface UseCasesProps {
  userName: string;
  businessManagerCode: string;
  businessUnitCode: string;
  onUseCasesLoaded?: (useCases: IUseCasesByRole) => void;
}

export const useUseCasesByStaff = ({
  userName,
  businessManagerCode,
  businessUnitCode,
  onUseCasesLoaded,
}: UseCasesProps) => {
  const [useCases, setUseCases] = useState<IUseCasesByRole>({
    listOfUseCasesByRoles: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<number | null>(null);

  useEffect(() => {
    const fetchUseCases = async () => {
      if (!userName || !businessManagerCode || !businessUnitCode) {
        setHasError(400);
        setUseCases({
          listOfUseCasesByRoles: [],
        });
        return;
      }

      setLoading(true);
      setHasError(null);

      try {
        console.log("Fetching use cases...");
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
      } finally {
        setLoading(false);
      }
    };
    fetchUseCases();
  }, []);

  return { useCases, loading, hasError };
};
