import { useState, useEffect } from "react";

import { encrypt } from "@utils/encrypt";
import { staffPortalByBusinessManager } from "@services/staffPortal/StaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState<number | null>(1001);
  const [isFetching, setIsFetching] = useState(true);

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchPortalData = async () => {
      setIsFetching(true);
      try {
        const staffPortalData = await staffPortalByBusinessManager(codeParame);

        if (!staffPortalData || Object.keys(staffPortalData).length === 0) {
          return;
        }

        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);

        setHasError(null);
        setPortalData(staffPortalData);
      } catch (error: unknown) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Unknown error while fetching portal data");

        Logger.error("Error al obtener datos del portal", normalizedError, {
          module: "usePortalData",
          action: "staffPortalByBusinessManager",
          codeParame,
        });

        setHasError(500);

        const errorConfig = modalErrorConfig[1016];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsFetching(false);
      }
    };

    void fetchPortalData();
  }, [codeParame, showErrorModal]);

  return { portalData, hasError, isFetching };
};
