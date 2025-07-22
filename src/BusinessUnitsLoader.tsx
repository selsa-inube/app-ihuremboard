import { useEffect, useRef, useMemo } from "react";
import { useBusinessUnits } from "@hooks/useBusinessUnits";
import { useAppContext } from "./context/AppContext/useAppContext";

interface BusinessUnitsLoaderProps {
  portalCode: string;
}

export function BusinessUnitsLoader({ portalCode }: BusinessUnitsLoaderProps) {
  const {
    staffUser,
    setBusinessUnits,
    setBusinessUnitsIsFetching,
    setSelectedClient,
  } = useAppContext();

  const userAccount = useMemo(() => staffUser?.userAccount || "", [staffUser]);

  const { businessUnitsData, hasError, isFetching } = useBusinessUnits(
    userAccount,
    portalCode,
  );

  const hasSetUnits = useRef(false);

  useEffect(() => {
    setBusinessUnitsIsFetching(isFetching);

    if (isFetching || hasError || hasSetUnits.current) {
      return;
    }

    if (businessUnitsData.length > 0) {
      setBusinessUnits(businessUnitsData);

      if (businessUnitsData.length === 1) {
        const uniqueUnit = businessUnitsData[0];

        setSelectedClient?.({
          id: uniqueUnit.businessUnitPublicCode,
          name: uniqueUnit.abbreviatedName,
          sigla: uniqueUnit.abbreviatedName,
          logo: uniqueUnit.urlLogo,
        });
      }

      hasSetUnits.current = true;
    }
  }, [
    isFetching,
    hasError,
    businessUnitsData,
    setBusinessUnits,
    setBusinessUnitsIsFetching,
    setSelectedClient,
  ]);

  return null;
}
