import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIAuth } from "@inube/iauth-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { useStaffUserAccount } from "@hooks/useStaffUserAccount";
import { Login } from "@pages/login";
import { useAppContext } from "@context/AppContext/useAppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { useSignOut } from "@hooks/useSignOut";

export function FirstPage() {
  const { user, setStaffUser } = useAppContext();
  const { isAuthenticated } = useIAuth();
  const navigate = useNavigate();

  const {
    userAccount,
    hasError: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount({
    userAccountId: user?.id,
    enabled: !!user?.id,
  });
  const { signOut } = useSignOut();
  useEffect(() => {
    if (
      userAccount?.identificationDocumentNumber &&
      !userAccountLoading &&
      !userAccountError
    ) {
      setStaffUser(userAccount);
      navigate(`/login/${userAccount}/checking-credentials`, { replace: true });
    }
  }, [
    userAccount,
    userAccountLoading,
    userAccountError,
    setStaffUser,
    navigate,
  ]);

  if (!isAuthenticated) {
    return <ErrorPage />;
  }

  if (userAccountLoading) {
    return <LoadingAppUI />;
  }
  if (userAccountError || !userAccount?.identificationDocumentNumber) {
    signOut("/error?code=1004");
    return;
  }

  return <Login />;
}
