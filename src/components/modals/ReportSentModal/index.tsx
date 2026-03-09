import { Icon, Blanket, useMediaQuery, Text, Stack } from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import {
  MdOutlineCheckCircle,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";

import { StyledModal, StyledCard, StyledActionsContainer } from "./styles";

export type ModalVariant = "success" | "error";

export interface ModalAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface ReportSentModalProps {
  title: string;
  description: string;
  subdescription?: string;
  variant?: ModalVariant;
  portalId?: string;
  actions?: ModalAction[];
}

export function ReportSentModal(props: ReportSentModalProps) {
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
      icon: <MdOutlineCheckCircle />,
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
        <Stack direction="column" alignItems="center" gap="8px">
          <Text type="title" weight="bold" textAlign="center">
            {title}
          </Text>
          <Stack direction="column" alignItems="center" gap="0px">
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

        {actions.length > 0 && (
          <StyledActionsContainer>
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
          </StyledActionsContainer>
        )}
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
