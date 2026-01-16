import { useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";
import { useHeaders } from "@hooks/useHeaders";

export function useOptionsMenu(
  staffPortalPublicCode: string,
  businessUnitPublicCode: string,
) {
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>([]);
  const [hasError, setHasError] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const { provisionedPortal, selectedClient } = useAppContext();
  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

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
        const headers = await getHeaders();

        const staffOptionData = await getOptionForCustomerPortal(
          staffPortalPublicCode,
          businessUnitPublicCode,
          headers,
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
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Unknown error while fetching options menu");

        Logger.error(
          "Error al obtener opciones del menú del portal",
          normalizedError,
          {
            module: "useOptionsMenu",
            action: "getOptionForCustomerPortal",
            staffPortalPublicCode,
            businessUnitPublicCode,
            selectedClientId: selectedClient?.id,
          },
        );

        setHasError(1014);
        const errorConfig = modalErrorConfig[1014];

        showErrorModal({
          descriptionText: errorConfig.descriptionText,
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
    getHeaders,
  ]);

  return { optionData, hasError, isFetching };
}
