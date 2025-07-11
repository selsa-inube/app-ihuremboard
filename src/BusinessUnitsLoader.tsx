import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useBusinessUnits } from "@hooks/useBusinessUnits";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useAppContext } from "./context/AppContext/useAppContext";

interface BusinessUnitsLoaderProps {
  portalCode: string;
}

export function BusinessUnitsLoader({ portalCode }: BusinessUnitsLoaderProps) {
  const {
    staffUser,
    setBusinessUnits,
    setBusinessUnitsIsFetching,
    setUseCasesByRole,
  } = useAppContext();

  const { logout } = useAuth0();

  const [shouldLogout, setShouldLogout] = useState(false);
  const [hasValidated, setHasValidated] = useState(false);

  const userAccount = staffUser?.identificationDocumentNumber || "";
  const businessManagerCode = staffUser?.businessManagerCode || "";

  const selectedBusinessUnitCode =
    staffUser?.staffByBusinessUnitAndRole?.[0]?.businessUnitCode || "";

  const hasBusinessUnitSelected =
    Array.isArray(staffUser?.staffByBusinessUnitAndRole) &&
    staffUser.staffByBusinessUnitAndRole.length > 0 &&
    !!selectedBusinessUnitCode;

  const canValidateUseCases =
    !!userAccount &&
    !!businessManagerCode &&
    hasBusinessUnitSelected &&
    !hasValidated;

  const {
    businessUnitsData,
    hasError: businessUnitsError,
    isFetching,
  } = useBusinessUnits(userAccount, portalCode);

  const isStaffUserReady =
    !!staffUser && Object.keys(staffUser).length > 0 && hasBusinessUnitSelected;

  useEffect(() => {
    const validateAccess = async () => {
      try {
        const useCases = await getUseCasesByStaff(
          userAccount,
          businessManagerCode,
          selectedBusinessUnitCode,
        );

        const hasPortalAccess = useCases.some((useCase) =>
          useCase.listOfUseCasesByRoles?.includes("PortalBoardAccess"),
        );

        if (!hasPortalAccess) {
          setShouldLogout(true);
        } else {
          setUseCasesByRole(useCases);
        }
      } catch (error) {
        console.error("❌ Error al validar casos de uso", error);
        setShouldLogout(true);
      } finally {
        setHasValidated(true);
      }
    };

    if (canValidateUseCases) {
      validateAccess();
    }
  }, [
    userAccount,
    businessManagerCode,
    selectedBusinessUnitCode,
    canValidateUseCases,
    setUseCasesByRole,
  ]);

  useEffect(() => {
    if (shouldLogout) {
      const timer = setTimeout(() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [shouldLogout, logout]);

  useEffect(() => {
    setBusinessUnitsIsFetching(isFetching);

    if (!isFetching && !businessUnitsError && businessUnitsData.length > 0) {
      setBusinessUnits(businessUnitsData);
    }
  }, [
    isFetching,
    businessUnitsError,
    businessUnitsData,
    setBusinessUnits,
    setBusinessUnitsIsFetching,
  ]);

  if (!isStaffUserReady) {
    return null;
  }

  if (shouldLogout) {
    return <ErrorPage errorCode={1008} />;
  }

  return null;
}
