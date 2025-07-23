import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";
import { useSignOut } from "@hooks/useSignOut";

export function useValidatePortalAccess(trigger: boolean) {
  const { selectedClient, user, businessManagers, setUseCasesByRole } =
    useAppContext();
  const navigate = useNavigate();
  const { signOut } = useSignOut();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

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

      if (!roles.includes("PortalBoardAccess")) {
        setIsAuthorized(false);
        signOut("/error?code=1008");
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
  ]);

  return {
    loading,
    isAuthorized,
  };
}
