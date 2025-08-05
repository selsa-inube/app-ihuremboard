import { useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { mapOptionForCustomerPortalApiToEntities } from "@services/staffPortal/getOptionForCustomerPortal/mappers";
import { environment } from "@config/environment";
import { optionDescriptionStaff } from "@mocks/staff/staff.mock";

import { useErrorFlag } from "./useErrorFlag";

export function useOptionsMenu(
  staffPortalPublicCode: string,
  businessUnit: string,
) {
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>(
    [] as IOptionWithSubOptions[],
  );
  const [hasError, setHasError] = useState<number | null>(1005);
  const [isFetching, setIsFetching] = useState(true);
  const [flagShown, setFlagShown] = useState(false);

  const { provisionedPortal, selectedClient } = useAppContext();
  useErrorFlag({ flagShown });

  useEffect(() => {
    const fetchoptionData = async () => {
      setIsFetching(true);
      if (!provisionedPortal || !selectedClient) {
        setHasError(1005);
        setFlagShown(true);
        return;
      }
      try {
        const staffoptionData =
          environment.IVITE_VERCEL === "Y"
            ? mapOptionForCustomerPortalApiToEntities(optionDescriptionStaff)
            : await getOptionForCustomerPortal(
                staffPortalPublicCode,
                businessUnit,
              );
        if (staffoptionData.length === 0) {
          setHasError(1005);
          setFlagShown(true);
          return;
        }
        setHasError(null);
        setOptionData(staffoptionData);
      } catch {
        setHasError(500);
        setFlagShown(true);
      } finally {
        setIsFetching(false);
      }
    };

    void fetchoptionData();
  }, [provisionedPortal, selectedClient]);

  return { optionData, hasError, isFetching };
}
