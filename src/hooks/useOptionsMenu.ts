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
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>([]);
  const [hasError, setHasError] = useState<number | null>(1005);
  const [isFetching, setIsFetching] = useState(true);
  const [flagShown, setFlagShown] = useState(false);

  const { provisionedPortal, selectedClient } = useAppContext();
  useErrorFlag({ flagShown });

  useEffect(() => {
    const fetchOptionData = async () => {
      setIsFetching(true);

      if (!provisionedPortal || !selectedClient) {
        setHasError(1005);
        setFlagShown(true);
        setIsFetching(false);
        return;
      }

      try {
        let staffOptionData: IOptionWithSubOptions[] = [];

        if (environment.IVITE_VERCEL === "Y") {
          staffOptionData = mapOptionForCustomerPortalApiToEntities(
            optionDescriptionStaff,
          );
        } else {
          staffOptionData = await getOptionForCustomerPortal(
            staffPortalPublicCode,
            businessUnit,
          );
        }

        if (staffOptionData.length === 0) {
          setHasError(1005);
          setFlagShown(true);
          return;
        }

        setOptionData(staffOptionData);
        setHasError(null);
      } catch (error) {
        console.error("Error en useOptionsMenu:", error);
        setHasError(500);
        setFlagShown(true);
      } finally {
        setIsFetching(false);
      }
    };

    void fetchOptionData();
  }, [provisionedPortal, selectedClient, staffPortalPublicCode, businessUnit]);

  return { optionData, hasError, isFetching };
}
