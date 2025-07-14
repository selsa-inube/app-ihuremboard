import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useBusinessUnits } from "@hooks/useBusinessUnits";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useAppContext } from "./context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";

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

  const userAccount = staffUser?.identificationDocumentNumber || "";
  const businessManagerCode = staffUser?.businessManagerCode || "";

  const selectedBusinessUnitCode =
    staffUser?.staffByBusinessUnitAndRole?.[0]?.businessUnitCode || "";

  const hasBusinessUnitSelected =
    Array.isArray(staffUser?.staffByBusinessUnitAndRole) &&
    staffUser.staffByBusinessUnitAndRole.length > 0 &&
    !!selectedBusinessUnitCode;

  const {
    businessUnitsData,
    hasError: businessUnitsError,
    isFetching,
  } = useBusinessUnits(userAccount, portalCode);

  const isStaffUserReady =
    !!staffUser && Object.keys(staffUser).length > 0 && hasBusinessUnitSelected;

  useUseCasesByStaff({
    userName: userAccount,
    businessManagerCode,
    businessUnitCode: selectedBusinessUnitCode,
    onUseCasesLoaded: (data) => {
      const hasPortalAccess = data.some((useCase) =>
        useCase.listOfUseCasesByRoles?.includes("PortalBoardAccess"),
      );

      if (!hasPortalAccess) {
        setShouldLogout(true);
      } else {
        setUseCasesByRole(data);
      }
    },
  });

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
