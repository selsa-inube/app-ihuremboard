import { Stack, Text, Icon } from "@inubekit/inubekit";
import { MdOutlineInfo, MdClose } from "react-icons/md";

import { labels } from "@i18n/labels";

import {
  StyledContainer,
  StyledLi,
  StyledUl,
  StyledActions,
  StyledCloseIcon,
} from "./styles";
import { Actions } from "./config";

interface ActionModalProps {
  disableRequirementsAction?: boolean;
  disableDiscardAction?: boolean;
  onSeeRequirements?: () => void;
  onDiscard?: () => void;
  onDiscardInfo?: () => void;
  onClose?: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const {
    disableRequirementsAction,
    disableDiscardAction,
    onSeeRequirements,
    onDiscard,
    onDiscardInfo,
    onClose,
  } = props;

  const actionsLi = Actions(onSeeRequirements, onDiscard);

  const modifiedActions = actionsLi.map((action) => {
    const isDisabled =
      action.label === labels.requests.actions.seeRequirements
        ? disableRequirementsAction
        : action.label === labels.requests.actions.discard
          ? disableDiscardAction
          : false;

    return {
      ...action,
      isDisabled,
      appearance: isDisabled ? "gray" : action.appearance,
    };
  });

  return (
    <StyledContainer>
      <StyledActions>
        <Stack>
          <StyledUl>
            {modifiedActions.map((item, index) => (
              <StyledLi
                key={index}
                onClick={(event) => {
                  if (item.isDisabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }
                  item.onClick?.();
                }}
                $isDisabled={item.isDisabled}
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
                {item.isDisabled && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                    onClick={onDiscardInfo}
                  />
                )}
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
      </StyledActions>
    </StyledContainer>
  );
}
