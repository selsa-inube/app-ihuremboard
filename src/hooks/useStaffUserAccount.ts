import { useState, useEffect } from "react";

import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";

import { useErrorFlag } from "./useErrorFlag";

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
  const [flagShown, setFlagShown] = useState(false);

  useErrorFlag({ flagShown });

  useEffect(() => {
    const fetchUserAccount = async () => {
      console.log({ userAccountId });
      if (!userAccountId) {
        setHasError(null);
        setLoading(false);
        return;
      }
      try {
        console.log("Fetching user account...");
        const data = await staffUserAccountById(userAccountId);
        console.log({ data });
        setUserAccount(data);
      } catch (error) {
        console.error("✖️ Error fetching user account:", error);
        setHasError(500);
        setFlagShown(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccount();
  }, [userAccountId]);

  return { userAccount, loading, hasError };
};
