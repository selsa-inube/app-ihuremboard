import { createPortal } from "react-dom";
import { Stack, Text, Icon, useMediaQuery } from "@inubekit/inubekit";
import { MdClose } from "react-icons/md";

import { StyledLi, StyledUl, StyledActions, StyledCloseIcon } from "./styles";
import { Actions } from "./config";
import { IAction } from "./types";

interface ActionModalProps {
  disableExecute?: boolean;
  disableDiscard?: boolean;
  disableAttach?: boolean;
  disableSeeAttachments?: boolean;
  actionDescriptions?: Record<string, string>;
  onExecute?: () => void;
  onDiscard?: () => void;
  onAttach?: () => void;
  onSeeAttachments?: () => void;
  onClose?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function ActionModal(props: ActionModalProps) {
  const {
    disableExecute,
    disableDiscard,
    disableAttach,
    disableSeeAttachments,
    actionDescriptions,
    onExecute,
    onDiscard,
    onAttach,
    onSeeAttachments,
    onClose,
    onInfoIconClick,
  } = props;

  const actionsList = Actions({
    disableExecute,
    disableDiscard,
    disableAttach,
    disableSeeAttachments,
    onExecute,
    onDiscard,
    onAttach,
    onSeeAttachments,
  });

  const isMobile = useMediaQuery("(max-width: 490px)");

  const handleItemClick = (item: IAction) => {
    if (item.isDisabled && onInfoIconClick) {
      onInfoIconClick(
        actionDescriptions?.[item.id] ?? "No puedes realizar esta acción",
      );
    } else if (!item.isDisabled && item.onClick) {
      item.onClick();
    }
  };

  return createPortal(
    <StyledActions $isMobile={isMobile}>
      <Stack>
        <StyledUl>
          {actionsList.map((item, index) => (
            <StyledLi
              key={index}
              $isDisabled={item.isDisabled}
              onClick={() => handleItemClick(item)}
            >
              <Icon
                icon={item.icon}
                appearance={item.appearance}
                disabled={item.isDisabled}
                size="18px"
              />
              <Text
                size="medium"
                appearance={item.isDisabled ? "gray" : "dark"}
              >
                {item.label}
              </Text>
            </StyledLi>
          ))}
        </StyledUl>
        <StyledCloseIcon>
          <Icon
            icon={<MdClose />}
            appearance="dark"
            size="18px"
            onClick={onClose}
            cursorHover
          />
        </StyledCloseIcon>
      </Stack>
    </StyledActions>,
    document.body,
  );
}
