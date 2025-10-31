import { useState, useEffect } from "react";

import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

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

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!userAccountId) {
        setHasError(null);
        setLoading(false);
        return;
      }
      try {
        const data = await staffUserAccountById(userAccountId);
        setUserAccount(data);
      } catch (err) {
        console.error("❌ Error al obtener cuenta de usuario:", err);
        setHasError(500);
        const errorConfig = modalErrorConfig[1018];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccount();
  }, [userAccountId, showErrorModal]);

  return { userAccount, loading, hasError };
};
