import { useState, useEffect } from "react";

import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { decrypt, encrypt } from "@utils/encrypt";

interface AuthConfig {
  clientId: string;
  clientSecret: string;
  originatorCode?: string;
}

export function usePortalAuth() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

  const [authConfig, setAuthConfig] = useState<AuthConfig | null>(null);
  const [publicCode, setPublicCode] = useState<string | null>(null);

  useEffect(() => {
    if (portalParam && portalParam !== decryptedPortal) {
      const encryptedPortal = encrypt(portalParam);
      localStorage.setItem("portalCode", encryptedPortal);
    }
  }, [portalParam, decryptedPortal]);

  const {
    portalData,
    hasError: hasPortalError,
    isFetching: portalLoading,
  } = usePortalData(portalCode);
  const {
    businessManagersData,
    hasError: hasManagersError,
    codeError: BusinessManagersCode,
    isFetching: managersLoading,
  } = useBusinessManagers(portalData);

  useEffect(() => {
    if (portalData?.publicCode) {
      setPublicCode(portalData.publicCode);
    }
  }, [portalData]);

  useEffect(() => {
    if (
      businessManagersData.clientId &&
      businessManagersData.clientSecret &&
      !hasPortalError &&
      !hasManagersError
    ) {
      setAuthConfig({
        clientId: businessManagersData.clientId,
        clientSecret: businessManagersData.clientSecret,
        originatorCode: businessManagersData.publicCode,
      });
    }
  }, [businessManagersData, hasPortalError, hasManagersError]);

  const hasAuthError = hasPortalError ?? hasManagersError ?? !authConfig;
  const errorCode = BusinessManagersCode;
  const loading = portalLoading ?? managersLoading;

  return {
    portalCode,
    publicCode,
    portalData,
    authConfig,
    hasAuthError,
    errorCode,
    hasPortalError,
    hasManagersError,
    businessManagersData,
    loading,
  };
}
