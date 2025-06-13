import { Stack, Text, Divider } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { StyledRequestCard, StyledTitle } from "./styles";

interface RequestCardProps {
  id: string;
  title: string;
  requestDate: string;
  responsible?: string;
  hasResponsible?: boolean;
  onclick?: () => void;
}

const RequestCard = (props: RequestCardProps) => {
  const {
    id,
    title,
    requestDate,
    responsible = "Sin responsable",
    hasResponsible = false,
    onclick,
  } = props;

  return (
    <Stack direction="column" width="280px">
      <StyledRequestCard onClick={onclick}>
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
            <Text size="medium" appearance="gray">
              {hasResponsible ? responsible : "Sin nombre de empleado"}
            </Text>
          </Stack>
        </Stack>
      </StyledRequestCard>
    </Stack>
  );
};

export { RequestCard };
export type { RequestCardProps };
