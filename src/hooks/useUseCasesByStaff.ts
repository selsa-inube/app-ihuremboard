import { useEffect, useState } from "react";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";
import { Logger } from "@utils/logger";
import { useHeaders } from "@hooks/useHeaders";

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
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<number | null>(null);

  const { getHeaders } = useHeaders();

  useEffect(() => {
    const fetchUseCases = async () => {
      if (!userName || !businessManagerCode || !businessUnitCode) {
        setHasError(400);
        setUseCases({ listOfUseCasesByRoles: [] });
        setLoading(false);
        return;
      }

      setLoading(true);
      setHasError(null);

      try {
        const headers = await getHeaders();

        const data = await getUseCasesByStaff(
          userName,
          businessManagerCode,
          businessUnitCode,
          headers,
        );

        setUseCases(data);
        onUseCasesLoaded?.(data);
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Unknown error while fetching use cases");

        Logger.error(
          "Error al obtener casos de uso del staff",
          normalizedError,
          {
            module: "useUseCasesByStaff",
            action: "getUseCasesByStaff",
            userName,
            businessManagerCode,
            businessUnitCode,
          },
        );

        setHasError(500);
      } finally {
        setLoading(false);
      }
    };

    void fetchUseCases();
  }, [
    userName,
    businessManagerCode,
    businessUnitCode,
    onUseCasesLoaded,
    getHeaders,
  ]);

  return { useCases, loading, hasError };
};
