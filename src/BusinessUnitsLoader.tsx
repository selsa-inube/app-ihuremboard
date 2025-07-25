import { useEffect, useRef, useMemo } from "react";
import { useBusinessUnits } from "@hooks/useBusinessUnits";
import { useAppContext } from "./context/AppContext/useAppContext";
import { useSignOut } from "@hooks/useSignOut";

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

  const { signOut } = useSignOut();

  const userAccount = useMemo(() => staffUser?.userAccount || "", [staffUser]);

  const { businessUnitsData, hasError, codeError, isFetching } =
    useBusinessUnits(userAccount, portalCode);

  const hasSetUnits = useRef(false);
  const hasHandledError = useRef(false);

  useEffect(() => {
    setBusinessUnitsIsFetching(isFetching);

    if (isFetching || hasSetUnits.current || hasHandledError.current) return;

    if (hasError && codeError === 1006) {
      hasHandledError.current = true;
      signOut("/error?code=1003");
      return;
    }

    if (!hasError && businessUnitsData.length > 0) {
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
    codeError,
    businessUnitsData,
    setBusinessUnits,
    setBusinessUnitsIsFetching,
    setSelectedClient,
    signOut,
  ]);

  return null;
}
