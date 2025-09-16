import {
  Text,
  useMediaQuery,
  Icon,
  Stack,
  SkeletonLine,
} from "@inubekit/inubekit";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

import { spacing } from "@design/tokens/spacing";
import { InfoModal } from "@components/modals/InfoModal";
import { StyledRequestSummaryContainer } from "./styles";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

export interface RequestSummaryProps {
  canSeeRequirements?: boolean;
  isLoading?: boolean;
  staffName?: string;
  requestNumber?: string;
  requestDate?: string;
  title?: string;
  onDiscard?: () => void;
  onSeeRequirements?: () => void;
  onEditStaff?: () => void;
}

function RequestSummary(props: RequestSummaryProps) {
  const {
    isLoading = false,
    staffName = "",
    requestNumber,
    requestDate,
    title,
  } = props;

  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({ open: false, title: "Información", description: "" });

  const isMobile = useMediaQuery("(max-width: 710px)");

  function getRequestTypeTitle(type: string): string {
    if (type in ERequestType) {
      return ERequestType[type as keyof typeof ERequestType];
    }
    return "Tipo desconocido";
  }

  return (
    <Stack direction="column" gap={spacing.s100}>
      {/* Estado */}
      <Stack gap={spacing.s075}>
        <Text type="title" size="medium" weight="bold">
          Estado:
        </Text>
        <Text type="title" size="medium" appearance="gray">
          Verificación en gestión humana
        </Text>
      </Stack>

      <StyledRequestSummaryContainer $isMobile={isMobile}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          width="100%"
          gap={spacing.s100}
        >
          <Stack direction="column" gap={spacing.s050}>
            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                No. de solicitud
              </Text>
              <Text appearance="gray" type="label">
                {requestNumber ?? "XXXXXX"}
              </Text>
            </Stack>

            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                Fecha de solicitud
              </Text>
              <Text appearance="gray" type="label">
                {requestDate ? formatDate(requestDate) : "Sin fecha"}
              </Text>
            </Stack>

            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                Tipo de solicitud
              </Text>
              <Text appearance="gray" type="label">
                {getRequestTypeTitle(title ?? "")}
              </Text>
            </Stack>
          </Stack>

          <Stack alignItems="center" gap={spacing.s050}>
            {isLoading ? (
              <SkeletonLine animated width="120px" />
            ) : (
              <Text size="large">{staffName || "Sin responsable"}</Text>
            )}
          </Stack>

          <Stack>
            <Icon
              icon={<MdKeyboardArrowDown />}
              appearance="primary"
              size="24px"
              cursorHover
            />
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
    </Stack>
  );
}

export { RequestSummary };
