import { ReactNode } from "react";
import { IAuthProvider } from "@inube/iauth-react";

import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { usePortalAuth } from "@hooks/usePortalAuth";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { portalCode, authConfig, hasAuthError, errorCode, isLoading } =
    usePortalAuth();

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  if (isLoading) {
    return <LoadingAppUI />;
  }

  if (hasAuthError || !authConfig) {
    return <ErrorPage errorCode={errorCode ?? 1000} />;
  }

  return (
    <IAuthProvider
      originatorId={environment.ORIGINATOR_ID}
      callbackUrl={environment.REDIRECT_URI}
      iAuthUrl={environment.IAUTH_URL}
      serviceUrl={environment.IAUTH_SERVICE_URL}
      codeVerifier={environment.CODE_VERIFIER}
      codeChallenge={environment.CODE_CHALLENGE}
      state={environment.STATE}
      applicationName={environment.APPLICATION_NAME}
      originatorCode={environment.ORIGINATOR_CODE}
    >
      {children}
    </IAuthProvider>
  );
}
