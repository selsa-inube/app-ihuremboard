import { ReactNode } from "react";
import { IAuthProvider } from "@inube/iauth-react";

import { environment } from "@config/environment";
import { decrypt } from "@utils/encrypt";
import { ErrorPage } from "@components/layout/ErrorPage";
import { usePortalAuth } from "@hooks/usePortalAuth";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { portalCode, authConfig, hasAuthError, errorCode } = usePortalAuth();

  if (!portalCode) {
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
      clientId={decrypt(authConfig.clientId)}
      clientSecret={decrypt(authConfig.clientSecret)}
    >
      {children}
    </IAuthProvider>
  );
}
