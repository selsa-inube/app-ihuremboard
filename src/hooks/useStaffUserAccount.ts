import { useState, useEffect } from "react";

import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";
import { useHeaders } from "@hooks/useHeaders";

interface UseStaffUserAccountProps {
  userAccountId?: string;
  enabled?: boolean;
}

export const useStaffUserAccount = ({
  userAccountId,
}: UseStaffUserAccountProps) => {
  const [userAccount, setUserAccount] = useState<IStaffUserAccount>();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<number | null>(null);

  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!userAccountId) {
        setHasError(null);
        setLoading(false);
        return;
      }

      try {
        const headers = await getHeaders();

        const data = await staffUserAccountById(userAccountId, headers);
        setUserAccount(data);
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Unknown error while fetching staff user account");

        Logger.error("Error al obtener cuenta de usuario", normalizedError, {
          module: "useStaffUserAccount",
          action: "staffUserAccountById",
          userAccountId,
        });

        setHasError(1018);
        const errorConfig = modalErrorConfig[1018];

        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    };

    void fetchUserAccount();
  }, [userAccountId, showErrorModal, getHeaders]);

  return { userAccount, loading, hasError };
};
