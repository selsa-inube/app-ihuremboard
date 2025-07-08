import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";
import { mapUseCasesApiToEntities } from "./mappers";

const getUseCasesByStaff = async (
  userName: string,
  businessManagerCode: string,
  businessUnitCode: string,
): Promise<IUseCasesByRole[]> => {
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
          "X-Action": "SearchUseCaseForStaff",
          "X-User-Name": userName,
        },
        signal: controller.signal,
      };

      const params = new URLSearchParams({
        businessManagerCode,
        businessUnitCode,
      });

      const res = await fetch(
        `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs/AC:SearchUseCaseForStaff?${params.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los casos de uso del usuario",
          status: res.status,
          data,
        };
      }

      return mapUseCasesApiToEntities(data);
    } catch (error) {
      console.error(`Intento ${attempt} fallido:`, error);
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los casos de uso del usuario.",
        );
      }
    }
  }

  return [];
};

export { getUseCasesByStaff };
