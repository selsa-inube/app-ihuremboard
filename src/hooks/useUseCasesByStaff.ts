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
      if (!userName || !businessManagerCode || !businessUnitCode) {
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

        if (onUseCasesLoaded) {
          onUseCasesLoaded(data);
        }
      } catch {
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
