import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { mapStaffUserAccountApiToEntity } from "./mappers";
import { Logger } from "@utils/logger"; // ajusta la ruta según tu proyecto

const staffUserAccountById = async (
  userAccountId: string,
): Promise<IStaffUserAccount> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const params = new URLSearchParams({
        identificationDocumentNumber: userAccountId,
      });

      const res = await fetch(
        `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Action": "SearchAllStaff",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        Logger.info("No se encontraron datos del usuario", { userAccountId });
        return {} as IStaffUserAccount;
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al obtener los datos del usuario";
        throw new Error(errorMessage);
      }

      return mapStaffUserAccountApiToEntity(data[0]);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      Logger.error(`Attempt ${attempt} fallida al obtener usuario`, error, {
        userAccountId,
      });

      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del usuario.",
        );
      }
    }
  }

  return {} as IStaffUserAccount;
};

export { staffUserAccountById };
