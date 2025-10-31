import { useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

export function useOptionsMenu(
  staffPortalPublicCode: string,
  businessUnitPublicCode: string,
) {
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>([]);
  const [hasError, setHasError] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { provisionedPortal, selectedClient } = useAppContext();

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    if (!selectedClient || !businessUnitPublicCode) {
      setIsFetching(false);
      return;
    }

    const fetchOptionData = async () => {
      setIsFetching(true);
      if (!provisionedPortal || !selectedClient) {
        setHasError(1001);
        const errorConfig = modalErrorConfig[1001];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
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
          const errorConfig = modalErrorConfig[1005];
          showErrorModal({
            descriptionText: errorConfig.descriptionText,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        setHasError(null);
        setOptionData(staffOptionData);
      } catch (err) {
        console.error("❌ Error en fetchOptionData:", err);
        setHasError(500);
        const errorConfig = modalErrorConfig[1014];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
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
    showErrorModal,
  ]);

  return { optionData, hasError, isFetching };
}
