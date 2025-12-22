import { Stack, Text, Divider, Icon, useMediaQuery } from "@inubekit/inubekit";
import { MdInfoOutline } from "react-icons/md";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";
import { truncateText } from "@utils/string";

import { StyledTaskCard } from "./styles";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  hasNoPrivileges?: boolean;
  isNotResponsible?: boolean;
  icon?: React.JSX.Element;
}

function TaskCard(props: TaskCardProps) {
  const {
    id,
    title,
    description,
    hasNoPrivileges = false,
    isNotResponsible = false,
    icon,
  } = props;

  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <StyledTaskCard
      key={id}
      $isDisabled={hasNoPrivileges || isNotResponsible}
      $isMobile={isMobile}
    >
      <Stack direction="column" gap={spacing.s100}>
        <Stack alignItems="center" gap={spacing.s050}>
          <Icon
            icon={icon}
            appearance="primary"
            size="18px"
            spacing="narrow"
            disabled={hasNoPrivileges || isNotResponsible}
          />
          <Text
            size="small"
            ellipsis
            appearance={hasNoPrivileges ? "gray" : "dark"}
          >
            {title}
          </Text>
        </Stack>
        <Divider dashed />
        <Stack direction="column" gap={spacing.s050}>
          <Text type="label" size="small" appearance="gray">
            {truncateText(description, 65)}
          </Text>
        </Stack>
      </Stack>

      {hasNoPrivileges && !isNotResponsible && (
        <Stack gap={spacing.s050} alignItems="center">
          <Icon
            icon={<MdInfoOutline />}
            appearance="primary"
            size="14px"
            spacing="narrow"
            disabled={hasNoPrivileges}
          />
          <Text type="label" weight="bold" size="small" appearance="gray">
            {labels.requests.taskCard.noPrivileges}
          </Text>
        </Stack>
      )}
      {isNotResponsible && (
        <Stack gap={spacing.s050} alignItems="center">
          <Icon
            icon={<MdInfoOutline />}
            appearance="primary"
            size="14px"
            spacing="narrow"
            disabled={isNotResponsible}
          />
          <Text type="label" weight="bold" size="small" appearance="gray">
            {labels.requests.taskCard.notResponsible}
          </Text>
        </Stack>
      )}
    </StyledTaskCard>
  );
}

export { TaskCard };
export type { TaskCardProps };
