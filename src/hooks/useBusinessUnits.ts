import { useState, useEffect } from "react";

import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { getBusinessUnitsForOfficer } from "@services/businessUnits/getBusinessUnits";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_EMPTY_DATA = 1003;
const ERROR_CODE_FETCH_FAILED = 1008;

export const useBusinessUnits = (
  userAccount: string | undefined,
  portalPublicCode: string | undefined,
) => {
  const [businessUnitsData, setBusinessUnitsData] = useState<IBusinessUnit[]>(
    [],
  );
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const { getHeaders } = useHeaders();

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    let isMounted = true;

    if (!userAccount || !portalPublicCode) {
      if (isMounted) {
        setBusinessUnitsData([]);
        setHasError(false);
        setIsFetching(false);
      }
      return;
    }

    const fetchBusinessUnits = async () => {
      setIsFetching(true);

      try {
        const headers = await getHeaders();

        const fetchedBusinessUnits = await getBusinessUnitsForOfficer(
          userAccount,
          portalPublicCode,
          headers,
        );

        if (isMounted) {
          if (!fetchedBusinessUnits || fetchedBusinessUnits.length === 0) {
            setHasError(true);
            setCodeError(ERROR_CODE_EMPTY_DATA);
            const errorConfig = modalErrorConfig[ERROR_CODE_EMPTY_DATA];
            showErrorModal({
              descriptionText: `${errorConfig.descriptionText}: ${String(ERROR_CODE_EMPTY_DATA)}`,
              solutionText: errorConfig.solutionText,
            });
            setBusinessUnitsData([]);
          } else {
            setHasError(false);
            setBusinessUnitsData(fetchedBusinessUnits);
          }
        }
      } catch (error) {
        console.error("Error al obtener las unidades de negocio:", error);
        if (isMounted) {
          setHasError(true);
          const errorConfig = modalErrorConfig[ERROR_CODE_FETCH_FAILED];
          showErrorModal({
            descriptionText: `${errorConfig.descriptionText}: ${String(error)}`,
            solutionText: errorConfig.solutionText,
          });
          setBusinessUnitsData([]);
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    };

    fetchBusinessUnits();

    return () => {
      isMounted = false;
    };
  }, [userAccount, portalPublicCode]);

  return { businessUnitsData, hasError, codeError, isFetching };
};
