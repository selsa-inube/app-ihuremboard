import { Stack, Text, Divider, Icon, useMediaQuery } from "@inubekit/inubekit";
import { MdOutlinePerson } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

import { StyledRequestCard, StyledTitle } from "./styles";

interface RequestCardProps {
  id: string;
  title: string;
  requestDate: string;
  employeeName: string;
  employeeSurnames?: string;
  status?: string;
  responsible: string;
  taskName?: string;
  showExtraIcon?: boolean;
  onclick?: () => void;
}

const RequestCard = (props: RequestCardProps) => {
  const {
    id,
    title,
    requestDate,
    employeeName,
    employeeSurnames,
    taskName,
    responsible,
    onclick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Stack direction="column" width={isMobile ? "100%" : "280px"}>
      <StyledRequestCard onClick={onclick} $isMobile={isMobile}>
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

        <Stack justifyContent="center" gap={spacing.s050}>
          <Icon icon={<MdOutlinePerson />} size="16px" appearance="primary" />
          <Text size="small" type="label">
            {employeeName?.trim()
              ? `${employeeName} ${employeeSurnames ?? ""}`.trim()
              : labels.cards.employeeWithoutName}
          </Text>
        </Stack>

        <Stack direction="column" gap={spacing.s100}>
          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              {labels.cards.numberLabel}
            </Text>
            <Text size="medium" appearance="gray">
              {id}
            </Text>
          </Stack>

          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              {labels.cards.requestTimeLabel}
            </Text>
            <Text size="medium" appearance="gray">
              {requestDate}
            </Text>
          </Stack>

          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              {labels.cards.statusLabel}
            </Text>
            <Text size="medium" appearance="gray">
              {taskName ?? labels.cards.noTasksLabel}
            </Text>
          </Stack>

          <Stack direction="column" gap={spacing.s050}>
            <Text type="title" weight="bold" size="small">
              {labels.cards.responsibleLabel}
            </Text>
            <Text size="medium" appearance="gray">
              {responsible}
            </Text>
          </Stack>
        </Stack>
      </StyledRequestCard>
    </Stack>
  );
};

export { RequestCard };
export type { RequestCardProps };
