import { ReactNode } from "react";
import { IAuthProvider } from "@inube/iauth-react";

import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { usePortalAuth } from "@hooks/usePortalAuth";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { portalCode, publicCode, authConfig, hasAuthError, errorCode } =
    usePortalAuth();

  if (!portalCode || !publicCode) {
    return <ErrorPage errorCode={1000} />;
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
      applicationName={publicCode}
      originatorCode={authConfig.originatorCode ?? environment.ORIGINATOR_ID}
    >
      {children}
    </IAuthProvider>
  );
}
