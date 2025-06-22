import { useEffect, useState } from "react";
import { Stack, Text, Divider, SkeletonLine } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";
import { StyledRequestCard, StyledTitle } from "./styles";

import { getEmployeeById } from "@services/employeeConsultation/getEmployeeById";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext";
import { useEmployee } from "@hooks/useEmployee";
import { Employee } from "@ptypes/employeePortalConsultation.types";

interface RequestCardProps {
  id: string;
  title: string;
  requestDate: string;
  employeeId?: string;
  hasEmployeeName?: boolean;
  onclick?: () => void;
}

const RequestCard = (props: RequestCardProps) => {
  const { id, title, requestDate, employeeId, hasEmployeeName = false } = props;

  const { selectedEmployee } = useAppContext();
  const { employee: selectedEmployeeData } = useEmployee(
    selectedEmployee.employeeId,
  );
  const { getHeaders } = useHeaders();

  const [employeeName, setEmployeeName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployeeName = async () => {
      if (!hasEmployeeName) return;

      setLoading(true);
      try {
        let fullName = "";

        if (employeeId) {
          const headers = await getHeaders();
          const employee: Employee = await getEmployeeById(employeeId, headers);
          console.log("Empleado obtenido:", employee);

          fullName = [employee?.names, employee?.surnames]
            .filter(Boolean)
            .join(" ")
            .trim();
        } else if (selectedEmployeeData) {
          fullName = [
            selectedEmployeeData?.names,
            selectedEmployeeData?.surnames,
          ]
            .filter(Boolean)
            .join(" ")
            .trim();
        }

        setEmployeeName(fullName || "Sin nombre de empleado");
      } catch (error) {
        console.error("Error al obtener el empleado:", error);
        setEmployeeName("Sin nombre de empleado");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeName();
  }, [employeeId, hasEmployeeName, getHeaders, selectedEmployeeData]);

  return (
    <Stack direction="column" width="280px">
      <StyledRequestCard>
        <StyledTitle>
          <Stack justifyContent="center">
            <Text
              type="label"
              size="small"
              appearance="primary"
              textAlign="center"
              weight="bold"
              padding={spacing.s050}
            >
              {title}
            </Text>
          </Stack>
        </StyledTitle>
        <Divider dashed />
        <Stack direction="column" gap={spacing.s100}>
          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              ID.
            </Text>
            <Text size="medium" appearance="gray">
              {id}
            </Text>
          </Stack>
          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              Fecha de solicitud
            </Text>
            <Text size="medium" appearance="gray">
              {requestDate}
            </Text>
          </Stack>
          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              Nombre de empleado
            </Text>
            {hasEmployeeName && loading ? (
              <SkeletonLine width="100%" animated />
            ) : (
              <Text size="medium" appearance="gray">
                {hasEmployeeName ? employeeName : "—"}
              </Text>
            )}
          </Stack>
        </Stack>
      </StyledRequestCard>
    </Stack>
  );
};

export { RequestCard };
export type { RequestCardProps };
