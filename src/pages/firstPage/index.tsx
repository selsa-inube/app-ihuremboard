import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { useStaffUserAccount } from "@hooks/useStaffUserAccount";

import { Login } from "@pages/login";
import { useAppContext } from "@context/AppContext/useAppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

export function FirstPage() {
  const { user, setStaffUser } = useAppContext();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const {
    userAccount,
    hasError: userAccountError,
    loading: userAccountLoading,
  } = useStaffUserAccount({
    userAccountId: user?.id ?? "",
  });

  useEffect(() => {
    if (userAccount && !userAccountLoading && !userAccountError) {
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

  if (userAccountError || !userAccount) {
    return <ErrorPage errorCode={1004} />;
  }

  return <Login />;
}
