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
    buttonText = "Entendido",
    title = "Error",
    portalId = "portal",
    appearance = "warning",
    descriptionText = "*Descripción general del error. Incluye código identificador.",
    solutionText = "*Cómo solucionarlo: Instrucciones generales que podrían conducir a la solución del error.",
    onCloseModal,
    onSubmitButtonClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
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
              <Text>Cerrar</Text>
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
            {descriptionText}
          </Text>
          <Divider dashed />
          <Text size="medium">{solutionText}</Text>
        </Stack>
        <Stack justifyContent="end">
          <Button onClick={onSubmitButtonClick} appearance={appearance}>
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
