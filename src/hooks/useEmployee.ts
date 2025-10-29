import { useState, useEffect, useCallback } from "react";

import { getEmployeeById } from "@services/employeeConsultation/getEmployeeById";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

interface UseEmployeeResult {
  employee: Employee;
  loading: boolean;
  error: string | null;
  refetch: (id?: string) => void;
}

export const useEmployee = (initialEmployeeId: string): UseEmployeeResult => {
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string>(initialEmployeeId);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const fetchEmployee = useCallback(
    async (id = employeeId) => {
      setLoading(true);
      setError(null);

      try {
        const headers = await getHeaders();
        const data = await getEmployeeById(id, headers);
        setEmployee(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error desconocido al obtener el empleado";
        setError(errorMessage);
        console.error("Error al obtener la información del empleado:", err);
        const errorConfig = modalErrorConfig[1010];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    },
    [employeeId, getHeaders, showErrorModal],
  );

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const refetch = (newId: string = employeeId) => {
    setEmployeeId(newId);
    fetchEmployee(newId);
  };

  return { employee, loading, error, refetch };
};
