import { environment, fetchTimeoutServices } from "@config/environment";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";
import { mapUseCasesApiToEntity } from "./mappers";

const getUseCasesByStaff = async (
  userName: string,
  businessManagerCode: string,
  businessUnitCode: string,
): Promise<IUseCasesByRole> => {
  const fetchTimeout = fetchTimeoutServices;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "X-Action": "SearchUseCaseForStaff",
      "X-User-Name": userName,
    };

    const params = new URLSearchParams({
      businessManagerCode,
      businessUnitCode,
    });

    const url = `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();

    if (!res.ok) {
      return { listOfUseCasesByRoles: [] };
    }

    return mapUseCasesApiToEntity(data);
  } catch (error) {
    console.error("❌ Error al obtener casos de uso:", error);
    throw new Error(
      "Todos los intentos fallaron. No se pudieron obtener los casos de uso del usuario.",
    );
  }
};

export { getUseCasesByStaff };
