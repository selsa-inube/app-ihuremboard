import { MdClose } from "react-icons/md";
import { Stack, Text, Icon } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { StyledContainer, StyledLi, StyledUl, StyledActions } from "./styles";
import { Actions } from "./config";

interface ActionModalProps {
  onClose: () => void;
  onClickDetails?: () => void;
  onClickEdit?: () => void;
  onClickEliminate?: () => void;
  disableDeleteAction?: boolean;
}

export function ActionModal(props: ActionModalProps) {
  const {
    onClose,
    onClickDetails,
    onClickEdit,
    onClickEliminate,
    disableDeleteAction,
  } = props;

  const actionsLi = Actions(onClickDetails, onClickEliminate, onClickEdit);

  const noCumpleIndex = actionsLi.findIndex(
    (item) => item.label === "No cumple",
  );
  if (noCumpleIndex !== -1) {
    if (disableDeleteAction) {
      actionsLi[noCumpleIndex].onClick = undefined;
      actionsLi[noCumpleIndex].appearance = "gray";
    } else if (onClickEliminate) {
      actionsLi[noCumpleIndex].onClick = onClickEliminate;
      actionsLi[noCumpleIndex].appearance = "danger";
    }
  }

  return (
    <StyledContainer>
      <StyledActions>
        <Stack padding={`${spacing.s100} ${spacing.s150} `} width="132px">
          <Icon
            icon={<MdClose />}
            appearance="dark"
            size="18px"
            onClick={onClose}
            cursorHover
          />
          <StyledUl>
            {actionsLi.map((item, index) => (
              <StyledLi key={index} onClick={item.onClick}>
                <Icon icon={item.icon} appearance={item.appearance} />
                <Text size="medium">{item.label}</Text>
              </StyledLi>
            ))}
          </StyledUl>
        </Stack>
      </StyledActions>
    </StyledContainer>
  );
}
