import { Stack, Text, Divider, Icon } from "@inubekit/inubekit";
import { MdOutlinePerson, MdOutlineReportProblem } from "react-icons/md";
import { spacing } from "@design/tokens/spacing";
import { StyledRequestCard, StyledTitle } from "./styles";

interface RequestCardProps {
  id: string;
  title: string;
  requestDate: string;
  employeeName: string;
  employeeSurnames?: string;
  status: string;
  responsible: string;
  onclick?: () => void;
  showExtraIcon?: boolean;
}

const RequestCard = (props: RequestCardProps) => {
  const {
    id,
    title,
    requestDate,
    employeeName,
    employeeSurnames,
    status,
    responsible,
    onclick,
    showExtraIcon,
  } = props;

  return (
    <Stack direction="column" width="280px">
      <StyledRequestCard onClick={onclick}>
        <StyledTitle>
          <Text
            type="label"
            size="small"
            appearance="primary"
            textAlign="center"
            weight="bold"
          >
            {title}
          </Text>
        </StyledTitle>

        <Divider dashed />
        <Stack justifyContent="center">
          <Icon icon={<MdOutlinePerson />} size="16px" appearance="primary" />
          <Text size="small" type="label">
            {employeeName?.trim()
              ? `${employeeName} ${employeeSurnames ?? ""}`.trim()
              : "Sin nombre de empleado"}
          </Text>
        </Stack>
        <Stack direction="column" gap={spacing.s100}>
          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              Número
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
              Estado
            </Text>
            <Text size="medium" appearance="gray">
              {status}
            </Text>
          </Stack>

          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              Responsable
            </Text>
            <Text size="medium" appearance="gray">
              {responsible}
            </Text>
          </Stack>
        </Stack>

        {showExtraIcon && (
          <Stack justifyContent="flex-end">
            <Icon
              icon={<MdOutlineReportProblem />}
              size="20px"
              appearance="primary"
            />
          </Stack>
        )}
      </StyledRequestCard>
    </Stack>
  );
};

export { RequestCard };
export type { RequestCardProps };
