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
      `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${params.toString()}`,
      options,
    );

    clearTimeout(timeoutId);

    const data = await res.json();

    if (!res.ok) {
      return {} as IUseCasesByRole;
    }
    return mapUseCasesApiToEntity(data);
  } catch {
    throw new Error(
      "Todos los intentos fallaron. No se pudieron obtener los casos de uso del usuario.",
    );
  }
};

export { getUseCasesByStaff };
