import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Text,
  Stack,
  Divider,
  Button,
  Blanket,
  useMediaQuery,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface InfoModalProps {
  buttonText?: string;
  description?: string;
  titleDescription?: string;
  title?: string;
  portalId?: string;
  onCloseModal?: () => void;
}

export function InfoModal(props: InfoModalProps) {
  const {
    buttonText = labels.modal.infoModal.buttonText,
    description = labels.modal.infoModal.description,
    titleDescription = labels.modal.infoModal.titleDescription,
    title = labels.modal.infoModal.title,
    portalId = "portal",
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(labels.modal.requestDetail.errorPortalNode);
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>{labels.modal.infoModal.close}</Text>
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
        <Text>{titleDescription}</Text>
        <Text size="medium" appearance="gray">
          {description}
        </Text>
        <Stack justifyContent="end">
          <Button onClick={onCloseModal} fullwidth={isMobile} cursorHover>
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
