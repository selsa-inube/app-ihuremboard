import { MdCheckCircle, MdOutlineReportGmailerrorred } from "react-icons/md";
import { Icon, Blanket, useMediaQuery, Text, Stack } from "@inubekit/inubekit";
import { createPortal } from "react-dom";

import { spacing } from "@design/tokens/spacing";

import { IModalVariant, IModalAction } from "./types";
import { StyledModal, StyledCard } from "./styles";

export interface RegisterNoveltyModalProps {
  title: string;
  description: string;
  subdescription?: string;
  variant?: IModalVariant;
  portalId?: string;
  actions?: IModalAction[];
}

export function RegisterNoveltyModal(props: RegisterNoveltyModalProps) {
  const {
    title,
    description,
    subdescription,
    variant = "success",
    portalId = "portal",
    actions = [],
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  const iconConfig = {
    success: {
      icon: <MdCheckCircle />,
      appearance: "success" as const,
    },
    error: {
      icon: <MdOutlineReportGmailerrorred />,
      appearance: "danger" as const,
    },
  };

  const currentIcon = iconConfig[variant];

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Icon
          appearance={currentIcon.appearance}
          icon={currentIcon.icon}
          size="50px"
        />
        <Stack direction="column" alignItems="center" gap={spacing.s300}>
          <Text type="title" weight="bold" textAlign="center">
            {title}
          </Text>
          <Stack direction="column" alignItems="center">
            <Text appearance="gray" textAlign="center">
              {description}
            </Text>
            {subdescription && (
              <Text appearance="gray" textAlign="center">
                {subdescription}
              </Text>
            )}
          </Stack>
        </Stack>

        {actions && (
          <Stack justifyContent="center" gap={spacing.s200} width="100%">
            {actions.map((action, index) => (
              <StyledCard
                key={index}
                $smallScreen={isMobile}
                onClick={action.onClick}
              >
                <Icon
                  appearance={variant === "error" ? "danger" : "primary"}
                  icon={action.icon}
                  size="24px"
                />
                <Text
                  type="label"
                  size="small"
                  appearance="gray"
                  textAlign="center"
                >
                  {action.label}
                </Text>
              </StyledCard>
            ))}
          </Stack>
        )}
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
