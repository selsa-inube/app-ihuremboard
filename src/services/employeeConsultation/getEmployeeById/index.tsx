import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { Employee } from "@ptypes/employeePortalConsultation.types";

import { mapEmployeeApiToEntity } from "../mappers";

const getEmployeeById = async (
  employeeId: string,
  headers: Record<string, string>,
): Promise<Employee> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          ...headers,
          "X-Action": "SearchByIdEmployee",
        },
        signal: controller.signal,
      };

      const url =
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}` +
        `/employees/${encodeURIComponent(employeeId)}`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        throw new Error(`El empleado con ID ${employeeId} no existe.`);
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? `Error al obtener el empleado ${employeeId}`;
        throw new Error(errorMessage);
      }

      return mapEmployeeApiToEntity(data);
    } catch (err) {
      if (attempt === maxRetries) {
        if (err instanceof Error) {
          throw err;
        }
        throw new Error(
          `Todos los intentos fallaron. No se pudo obtener el empleado.`,
        );
      }
    }
  }
  throw new Error(`No se pudo obtener el empleado ${employeeId}.`);
};

export { getEmployeeById };
