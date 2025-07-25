import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";
import { useSignOut } from "@hooks/useSignOut";

export function useValidatePortalAccess(trigger: boolean) {
  const {
    selectedClient,
    user,
    businessManagers,
    businessUnits,
    setUseCasesByRole,
  } = useAppContext();
  const navigate = useNavigate();
  const { signOut } = useSignOut();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { useCases, loading } = useUseCasesByStaff({
    userName: user?.id ?? "",
    businessUnitCode: selectedClient?.name ?? "",
    businessManagerCode: businessManagers?.publicCode ?? "",
  });

  useEffect(() => {
    if (!trigger) return;

    if (!selectedClient) {
      navigate("/login", { replace: true });
      return;
    }

    if (!loading && useCases) {
      const roles = useCases.listOfUseCasesByRoles ?? [];

      const hasAccess = roles.includes("PortalBoardAccess");

      if (!hasAccess) {
        if (businessUnits?.length === 1) {
          signOut("/error?code=1008");
        } else {
          setIsAuthorized(false);
          setShowModal(true);
        }
      } else {
        setUseCasesByRole(roles);
        setIsAuthorized(true);
      }
    }
  }, [
    trigger,
    selectedClient,
    loading,
    useCases,
    navigate,
    setUseCasesByRole,
    signOut,
    businessUnits,
  ]);

  const closeModal = () => {
    setShowModal(false);
    signOut("/login");
  };

  return {
    loading,
    isAuthorized,
    showModal,
    closeModal,
  };
}
