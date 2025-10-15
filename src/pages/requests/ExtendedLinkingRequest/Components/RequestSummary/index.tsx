import {
  Text,
  useMediaQuery,
  Icon,
  Stack,
  Button,
  Divider,
  SkeletonLine,
} from "@inubekit/inubekit";
import {
  MdOutlinePerson,
  MdOutlineEdit,
  MdOutlineInfo,
  MdOutlineCheckCircle,
  MdClose,
} from "react-icons/md";
import { useState } from "react";

import { spacing } from "@design/tokens/spacing";
import { InfoModal } from "@components/modals/InfoModal";

import { Detail } from "../Detail";
import { StyledRequestSummaryContainer } from "./styles";

export interface RequestSummaryProps {
  canSeeRequirements?: boolean;
  isLoading?: boolean;
  staffName?: string;
  requestNumber?: string;
  requestDate?: string;
  onDiscard?: () => void;
  onSeeRequirements?: () => void;
  onEditStaff?: () => void;
}

function RequestSummary(props: RequestSummaryProps) {
  const {
    canSeeRequirements = true,
    isLoading = false,
    staffName = "",
    requestNumber,
    requestDate,
    onDiscard,
    onSeeRequirements,
    onEditStaff,
  } = props;

  const canDiscard = true;

  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({ open: false, title: "Información", description: "" });

  const isMobile = useMediaQuery("(max-width: 710px)");

  const openInfoModal = (description: string) => {
    setInfoModal({ open: true, title: "Información", description });
  };

  const actionDescriptions = {
    Discard: "No tiene privilegios para descartar solicitudes.",
    Requirements: "No tiene privilegios para ver requisitos.",
  };

  return (
    <>
      {isMobile && (
        <Detail
          onDiscard={onDiscard}
          onDiscardInfo={() => openInfoModal(actionDescriptions.Discard)}
          onSeeRequirements={onSeeRequirements}
          disableDiscard={!canDiscard}
          disableRequirements={!canSeeRequirements}
        />
      )}
      <StyledRequestSummaryContainer $isMobile={isMobile}>
        <Stack justifyContent="space-between" gap={spacing.s200}>
          <Stack
            gap={spacing.s150}
            justifyContent={isMobile ? "space-between" : "flex-start"}
            alignItems="center"
            width="100%"
          >
            <Stack gap={spacing.s050}>
              <Icon icon={<MdOutlinePerson />} appearance="dark" size="20px" />
              <Text type="label" weight="bold">
                Responsable:
              </Text>
            </Stack>

            <Stack gap={spacing.s050} alignItems="center">
              {isLoading ? (
                <SkeletonLine animated width="102px" />
              ) : (
                <Text type="label" appearance="gray">
                  {staffName || "Sin responsable"}
                </Text>
              )}
              <Icon
                icon={<MdOutlineEdit />}
                appearance="primary"
                size="16px"
                cursorHover
                onClick={onEditStaff}
              />
            </Stack>
          </Stack>
          {!isMobile && (
            <Stack gap={spacing.s200}>
              <Stack gap={spacing.s025} alignItems="center">
                <Button
                  disabled={!canSeeRequirements}
                  iconBefore={<MdOutlineCheckCircle />}
                  cursorHover
                  spacing="compact"
                  variant="outlined"
                  onClick={canSeeRequirements ? onSeeRequirements : undefined}
                >
                  Requisitos
                </Button>
                {!canSeeRequirements && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                    onClick={() =>
                      openInfoModal(actionDescriptions.Requirements)
                    }
                  />
                )}
              </Stack>
              <Stack gap={spacing.s025} alignItems="center">
                <Button
                  disabled={!canDiscard}
                  iconBefore={<MdClose />}
                  cursorHover
                  spacing="compact"
                  appearance="danger"
                  variant="outlined"
                  onClick={canDiscard ? onDiscard : undefined}
                >
                  Descartar
                </Button>
                {!canDiscard && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                    onClick={() => openInfoModal(actionDescriptions.Discard)}
                  />
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
        <Divider dashed />
        <Stack direction="column" gap={spacing.s050}>
          <Stack gap={spacing.s050}>
            <Text type="label" size="medium">
              No. de solicitud:
            </Text>
            <Text appearance="gray" type="label" size="small">
              {requestNumber ?? "XXXXXX"}
            </Text>
          </Stack>
          <Stack gap={spacing.s050}>
            <Text type="label" size="medium">
              Fecha de solicitud:
            </Text>
            <Text appearance="gray" type="label" size="small">
              {requestDate ?? "Sin Fecha"}
            </Text>
          </Stack>
        </Stack>
      </StyledRequestSummaryContainer>

      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription="¿Por qué está inhabilitado?"
          description={infoModal.description}
          onCloseModal={() =>
            setInfoModal({ open: false, title: "", description: "" })
          }
        />
      )}
    </>
  );
}

export { RequestSummary };
