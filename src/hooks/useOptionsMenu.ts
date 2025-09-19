import { useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { useSignOut } from "@hooks/useSignOut";

import { useErrorFlag } from "./useErrorFlag";

export function useOptionsMenu(
  staffPortalPublicCode: string,
  businessUnitPublicCode: string,
) {
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>([]);
  const [hasError, setHasError] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [flagShown, setFlagShown] = useState(false);

  const { provisionedPortal, selectedClient } = useAppContext();
  const { signOut } = useSignOut();

  useErrorFlag({ flagShown });

  useEffect(() => {
    if (hasError === 500 || hasError === 1001) {
      signOut(`/error?code=${hasError}`);
    }
  }, [hasError, signOut]);

  useEffect(() => {
    const fetchOptionData = async () => {
      setIsFetching(true);

      if (!provisionedPortal || !selectedClient) {
        setHasError(1001);
        setFlagShown(true);
        setIsFetching(false);
        return;
      }

      try {
        const staffOptionData = await getOptionForCustomerPortal(
          staffPortalPublicCode,
          businessUnitPublicCode,
        );

        if (staffOptionData.length === 0) {
          setHasError(1005);
          setFlagShown(true);
          return;
        }

        setHasError(null);
        setOptionData(staffOptionData);
      } catch (err) {
        console.error("❌ Error en fetchOptionData:", err);
        setHasError(500);
        setFlagShown(true);
      } finally {
        setIsFetching(false);
      }
    };

    void fetchOptionData();
  }, [
    provisionedPortal,
    selectedClient,
    staffPortalPublicCode,
    businessUnitPublicCode,
  ]);

  return { optionData, hasError, isFetching };
}
