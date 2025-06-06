import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { mapStaffUserAccountApiToEntity } from "./mappers";

const staffUserAccountById = async (
  userAccountId: string,
): Promise<IStaffUserAccount> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Action": "SearchAllStaff",
        },
        signal: controller.signal,
      };
      const params = new URLSearchParams({
        identificationDocumentNumber: userAccountId,
      });
      const res = await fetch(
        `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${params.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IStaffUserAccount;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del usuario",
          status: res.status,
          data,
        };
      }
      return mapStaffUserAccountApiToEntity(data[0]);
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
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
