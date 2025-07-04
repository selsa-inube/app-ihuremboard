import { Stack, Text, Divider, SkeletonLine } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";
import { StyledRequestCard, StyledTitle } from "./styles";

import { useEmployee } from "@hooks/useEmployee";

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

  const { employee, loading } = useEmployee(employeeId ?? "");

  const fullName =
    employee?.names?.trim() || employee?.surnames?.trim()
      ? [employee?.names?.trim(), employee?.surnames?.trim()]
          .filter(Boolean)
          .join(" ")
      : "";

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
                {hasEmployeeName ? fullName || "Sin nombre de empleado" : "—"}
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
