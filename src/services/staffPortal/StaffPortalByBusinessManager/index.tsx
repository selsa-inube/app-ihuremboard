import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";
import { mapStaffPortalByBusinessManagerApiToEntities } from "./mappers";

const staffPortalByBusinessManager = async (
  codeParame: string,
): Promise<IStaffPortalByBusinessManager> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        publicCode: codeParame,
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Action": "SearchAllStaffPortalsByBusinessManager",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/staff-portals-by-business-manager?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IStaffPortalByBusinessManager;
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al obtener los datos del portal";
        throw new Error(errorMessage);
      }

      const normalizedEmployeePortal = Array.isArray(data)
        ? mapStaffPortalByBusinessManagerApiToEntities(data)
        : [];

      return normalizedEmployeePortal[0];
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del portal.",
        );
      }
    }
  }

  return {} as IStaffPortalByBusinessManager;
};

export { staffPortalByBusinessManager };
