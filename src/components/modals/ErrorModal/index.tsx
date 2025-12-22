import {
  Icon,
  Text,
  Stack,
  Button,
  Blanket,
  Divider,
  useMediaQuery,
  IButtonAppearance,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineReport } from "react-icons/md";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface ErrorModalProps {
  buttonText?: string;
  title?: string;
  portalId?: string;
  appearance?: IButtonAppearance;
  descriptionText?: string;
  solutionText?: string;
  onCloseModal?: () => void;
  onSubmitButtonClick?: () => void;
}

export function ErrorModal(props: ErrorModalProps) {
  const {
    buttonText,
    title,
    portalId = "portal",
    appearance = "warning",
    descriptionText,
    solutionText,
    onCloseModal,
    onSubmitButtonClick,
  } = props;

  const buttonTextFinal = buttonText ?? labels.modal.generic.understood;
  const titleFinal = title ?? labels.modal.generic.errorTitle;
  const descriptionFinal =
    descriptionText ?? labels.modal.generic.errorDescription;
  const solutionFinal = solutionText ?? labels.modal.generic.errorSolution;
  const portalErrorText = labels.modal.requestDetail.errorPortalNode;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(portalErrorText);
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {titleFinal}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>{labels.modal.generic.close}</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>

        <Divider />

        <Stack direction="column" gap={spacing.s200}>
          <Stack justifyContent="center">
            <Icon
              icon={<MdOutlineReport />}
              size="68px"
              appearance={appearance}
            />
          </Stack>

          <Text size="medium" appearance="gray">
            {descriptionFinal}
          </Text>

          <Divider dashed />

          <Text size="medium">{solutionFinal}</Text>
        </Stack>

        <Stack justifyContent="end">
          <Button onClick={onSubmitButtonClick} appearance={appearance}>
            {buttonTextFinal}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
