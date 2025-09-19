import { useState, useEffect } from "react";

import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";

import { useErrorFlag } from "./useErrorFlag";

interface UseStaffUserAccountProps {
  userAccountId?: string;
  enabled?: boolean;
  onUserAccountLoaded?: (userAccount: IStaffUserAccount) => void;
}

export const useStaffUserAccount = ({
  userAccountId,
  enabled = true,
  onUserAccountLoaded,
}: UseStaffUserAccountProps) => {
  const [userAccount, setUserAccount] = useState<IStaffUserAccount>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<number | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  useErrorFlag({ flagShown });

  useEffect(() => {
    let mounted = true;

    const fetchUserAccount = async () => {
      if (!enabled || !userAccountId) {
        if (!mounted) return;
        setHasError(null);
        setLoading(false);
        return;
      }

      if (!mounted) return;
      setLoading(true);
      setHasError(null);
      setFlagShown(false);

      try {
        const data = await staffUserAccountById(userAccountId);
        if (!mounted) return;
        setUserAccount(data);
        if (onUserAccountLoaded) onUserAccountLoaded(data);
      } catch {
        if (!mounted) return;
        setHasError(500);
        setFlagShown(true);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchUserAccount();

    return () => {
      mounted = false;
    };
  }, [userAccountId, enabled, onUserAccountLoaded]);

  return { userAccount, loading, hasError };
};
