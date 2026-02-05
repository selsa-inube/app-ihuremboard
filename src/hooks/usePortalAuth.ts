import { useState, useEffect } from "react";

import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { decrypt, encrypt } from "@utils/encrypt";

interface AuthConfig {
  clientId: string;
  clientSecret: string;
}

export function usePortalAuth() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (portalParam && portalParam !== decryptedPortal) {
      const encryptedPortal = encrypt(portalParam);
      localStorage.setItem("portalCode", encryptedPortal);
    }
  }, [portalParam, decryptedPortal]);

  const { portalData, hasError: hasPortalError } = usePortalData(portalCode);
  const {
    businessManagersData,
    hasError: hasManagersError,
    codeError: BusinessManagersCode,
    isFetching: isFetchingManagers,
  } = useBusinessManagers(portalData);

  useEffect(() => {
    if (isFetchingManagers) {
      setIsLoading(true);
      return;
    }

    if (hasPortalError || hasManagersError) {
      setIsLoading(false);
      return;
    }

    if (businessManagersData.clientId && businessManagersData.clientSecret) {
      setAuthConfig({
        clientId: businessManagersData.clientId,
        clientSecret: businessManagersData.clientSecret,
      });
      setIsLoading(false);
    }
  }, [
    businessManagersData,
    hasPortalError,
    hasManagersError,
    isFetchingManagers,
  ]);

  const hasAuthError = hasPortalError ?? hasManagersError ?? !authConfig;
  const errorCode = BusinessManagersCode;

  return {
    portalCode,
    portalData,
    authConfig,
    hasAuthError,
    errorCode,
    hasPortalError,
    hasManagersError,
    businessManagersData,
    isLoading,
  };
}
