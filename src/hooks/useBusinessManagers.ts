import { useState, useEffect } from "react";

import {
  IBusinessManager,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { getBusinessManagerByCode } from "@services/businessManagers/getBusinessManagerById";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

export const useBusinessManagers = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManager>({} as IBusinessManager);
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode?.businessManagerCode) return;

      setIsFetching(true);
      try {
        const fetchedBusinessManagers = await getBusinessManagerByCode(
          portalPublicCode.businessManagerCode,
        );

        if (
          !fetchedBusinessManagers ||
          Object.keys(fetchedBusinessManagers).length === 0
        ) {
          const errorConfig = modalErrorConfig[1002];
          showErrorModal({
            descriptionText: errorConfig.descriptionText,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        setHasError(false);
        setBusinessManagersData(fetchedBusinessManagers);
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Unknown error while fetching business manager");

        Logger.error(
          "Error al obtener los datos del gestor de negocios",
          normalizedError,
          {
            module: "useBusinessManagers",
            action: "getBusinessManagerByCode",
            businessManagerCode: portalPublicCode.businessManagerCode,
          },
        );

        setHasError(true);
        setCodeError(1007);

        const errorConfig = modalErrorConfig[1007];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode, showErrorModal]);

  return { businessManagersData, hasError, codeError, isFetching };
};
