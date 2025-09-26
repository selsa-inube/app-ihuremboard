import {
  Text,
  useMediaQuery,
  Icon,
  Stack,
  SkeletonLine,
  IOption,
  Button,
} from "@inubekit/inubekit";
import {
  MdKeyboardArrowDown,
  MdMoreVert,
  MdAutorenew,
  MdOutlineCancel,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import { spacing } from "@design/tokens/spacing";
import { formatDate } from "@utils/date";
import { capitalizeFullName } from "@utils/string";

import {
  StyledRequestSummaryContainer,
  VerticalDivider,
  MobileIconContainer,
} from "./styles";
import { ActionModal } from "../Actions";

export interface RequestSummaryProps {
  isLoading?: boolean;
  requestNumber?: string | number;
  requestDate?: string;
  title?: string;
  status?: string;
  fullStaffName?: string;
  description?: string;
  statusOptions?: IOption[];
}

function RequestSummary({
  isLoading: propsIsLoading,
  requestNumber: propsRequestNumber,
  requestDate: propsRequestDate,
  title: propsTitle,
  status: propsStatus,
  fullStaffName: propsFullStaffName,
  statusOptions: propsStatusOptions,
}: RequestSummaryProps) {
  const location = useLocation();
  const state = location.state as RequestSummaryProps | undefined;

  const requestNumber = propsRequestNumber ?? state?.requestNumber;
  const requestDate = propsRequestDate ?? state?.requestDate;
  const title = propsTitle ?? state?.title;
  const status = propsStatus ?? state?.status;
  const fullStaffName = propsFullStaffName ?? state?.fullStaffName;
  const statusOptions = propsStatusOptions ?? state?.statusOptions ?? [];

  const isLoading = propsIsLoading ?? false;
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const isSmall = useMediaQuery("(max-width: 490px)");
  const [showActions, setShowActions] = useState(false);

  const staffDisplayName = fullStaffName
    ? capitalizeFullName(fullStaffName)
    : "Sin responsable";

  const statusLabel =
    statusOptions.find((opt) => opt.value === status)?.label ??
    status ??
    "Sin estado";

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");

  return (
    <Stack direction="column" gap={spacing.s100}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack gap={spacing.s075}>
          <Text type="title" size="medium" weight="bold">
            Estado:
          </Text>
          {isLoading ? (
            <SkeletonLine animated width="120px" />
          ) : (
            <Text type="title" size="medium" appearance="gray">
              {statusLabel}
            </Text>
          )}
        </Stack>
        {isMobile ? (
          <MobileIconContainer $isMobile={isMobile} $isSmall={isSmall}>
            <Icon
              icon={<MdMoreVert />}
              appearance="dark"
              size="24px"
              cursorHover
              onClick={() => setShowActions(true)}
            />
          </MobileIconContainer>
        ) : (
          <Stack direction="row" gap={spacing.s075} alignItems="center">
            <Button
              appearance="primary"
              onClick={handleExecute}
              iconBefore={<MdAutorenew />}
              spacing="compact"
            >
              Ejecutar
            </Button>
            <Button
              appearance="danger"
              onClick={handleDiscard}
              iconBefore={<MdOutlineCancel />}
              spacing="compact"
            >
              Descartar
            </Button>
            <VerticalDivider />
            <Button variant="outlined" onClick={handleAttach} spacing="compact">
              Adjuntar
            </Button>
            <Button
              variant="outlined"
              onClick={handleSeeAttachments}
              spacing="compact"
            >
              Ver adjuntos
            </Button>
          </Stack>
        )}
      </Stack>

      {isMobile && showActions && (
        <ActionModal
          onExecute={handleExecute}
          onDiscard={handleDiscard}
          onAttach={handleAttach}
          onSeeAttachments={handleSeeAttachments}
          onClose={() => setShowActions(false)}
          actionDescriptions={{
            execute: "No puedes ejecutar esta acción ahora",
            discard: "No puedes descartar esta acción ahora",
            attach: "No puedes adjuntar archivos en este momento",
            seeAttachments: "No puedes ver los adjuntos en este momento",
          }}
        />
      )}
      <StyledRequestSummaryContainer $isMobile={isMobile}>
        {isMobile ? (
          <Stack direction="column" gap={spacing.s150} width="100%">
            <Stack justifyContent="center">
              <Text weight="bold">{staffDisplayName}</Text>
            </Stack>

            <Stack
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Stack direction="column" gap={spacing.s075}>
                <Stack gap={spacing.s050}>
                  <Text type="label" weight="bold">
                    No. de solicitud
                  </Text>
                  {isLoading ? (
                    <SkeletonLine animated width="80px" />
                  ) : (
                    <Text appearance="gray" type="label">
                      {requestNumber ?? "XXXXXX"}
                    </Text>
                  )}
                </Stack>

                <Stack gap={spacing.s050}>
                  <Text type="label" weight="bold">
                    Fecha de solicitud
                  </Text>
                  {isLoading ? (
                    <SkeletonLine animated width="100px" />
                  ) : (
                    <Text appearance="gray" type="label">
                      {requestDate ? formatDate(requestDate) : "Sin fecha"}
                    </Text>
                  )}
                </Stack>

                <Stack gap={spacing.s050}>
                  <Text type="label" weight="bold">
                    Tipo de solicitud
                  </Text>
                  {isLoading ? (
                    <SkeletonLine animated width="140px" />
                  ) : (
                    <Text appearance="gray" type="label">
                      {title ?? "Tipo desconocido"}
                    </Text>
                  )}
                </Stack>
              </Stack>

              <Icon
                icon={<MdKeyboardArrowDown />}
                appearance="primary"
                size="24px"
                cursorHover
                onClick={() => console.log("Mostrar más información")}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            gap={spacing.s100}
          >
            <Stack direction="column" gap={spacing.s050}>
              <Stack gap={spacing.s050}>
                <Text type="label" weight="bold">
                  No. de solicitud
                </Text>
                {isLoading ? (
                  <SkeletonLine animated width="80px" />
                ) : (
                  <Text appearance="gray" type="label">
                    {requestNumber ?? "XXXXXX"}
                  </Text>
                )}
              </Stack>

              <Stack gap={spacing.s050}>
                <Text type="label" weight="bold">
                  Fecha de solicitud
                </Text>
                {isLoading ? (
                  <SkeletonLine animated width="100px" />
                ) : (
                  <Text appearance="gray" type="label">
                    {requestDate ? formatDate(requestDate) : "Sin fecha"}
                  </Text>
                )}
              </Stack>
              <Stack gap={spacing.s050}>
                <Text type="label" weight="bold">
                  Tipo de solicitud
                </Text>
                {isLoading ? (
                  <SkeletonLine animated width="140px" />
                ) : (
                  <Text appearance="gray" type="label">
                    {title ?? "Tipo desconocido"}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack alignItems="center" gap={spacing.s050}>
              {isLoading ? (
                <SkeletonLine animated width="120px" />
              ) : (
                <Text>{staffDisplayName}</Text>
              )}
            </Stack>

            <Stack>
              <Icon
                icon={<MdKeyboardArrowDown />}
                appearance="primary"
                size="24px"
                cursorHover
                onClick={() => console.log("Mostrar más información")}
              />
            </Stack>
          </Stack>
        )}
      </StyledRequestSummaryContainer>
    </Stack>
  );
}

export { RequestSummary };
