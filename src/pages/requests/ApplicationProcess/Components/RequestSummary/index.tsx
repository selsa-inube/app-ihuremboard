import {
  Stack,
  Text,
  Button,
  Icon,
  Divider,
  useMediaQuery,
} from "@inubekit/inubekit";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdAutorenew,
  MdOutlineCancel,
} from "react-icons/md";

import { spacing } from "@design/tokens/spacing";

import {
  StyledRequestSummaryContainer,
  DetailsGrid,
  DetailItem,
  VerticalDivider,
} from "./styles";

import { Detail } from "../Detail";
import { RequestSummaryProps, useRequestSummaryLogic } from "./interface";

export function RequestSummary(props: RequestSummaryProps) {
  const {
    requestNumber,
    requestDate,
    title,
    statusLabel,
    staffDisplayName,
    daysToPay,
    disbursementDate,
    contractNumber,
    businessName,
    contractType,
    observationEmployee,
    showDetails,
    setShowDetails,
    handleDiscard,
    handleExecute,
    handleAttach,
    handleSeeAttachments,
  } = useRequestSummaryLogic(props);

  const isMobile = useMediaQuery("(max-width: 1100px)");

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
          <Text type="title" size="medium" appearance="gray">
            {statusLabel}
          </Text>
        </Stack>

        {isMobile ? (
          <Detail
            onExecute={handleExecute}
            onDiscard={handleDiscard}
            onAttach={handleAttach}
            onSeeAttachments={handleSeeAttachments}
            actionDescriptions={{
              execute: "No puedes ejecutar esta acción ahora",
              discard: "No puedes descartar esta acción ahora",
              attach: "No puedes adjuntar archivos en este momento",
              seeAttachments: "No puedes ver los adjuntos en este momento",
            }}
          />
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

      <StyledRequestSummaryContainer $isMobile={isMobile}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          gap={spacing.s150}
          width="100%"
        >
          <Stack direction="column" gap={spacing.s075}>
            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                No. de solicitud
              </Text>
              <Text appearance="gray" type="label">
                {requestNumber ?? "N/A"}
              </Text>
            </Stack>

            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                Fecha de solicitud
              </Text>
              <Text appearance="gray" type="label">
                {requestDate ?? "N/A"}
              </Text>
            </Stack>

            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                Tipo de solicitud
              </Text>
              <Text appearance="gray" type="label">
                {title ?? "N/A"}
              </Text>
            </Stack>
          </Stack>

          <Stack alignItems="center">
            <Text size="large" weight="bold">
              {staffDisplayName}
            </Text>
          </Stack>

          <Stack>
            <Icon
              icon={
                showDetails ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
              }
              appearance="primary"
              size="24px"
              cursorHover
              onClick={() => setShowDetails(!showDetails)}
            />
          </Stack>
        </Stack>

        {showDetails && (
          <>
            <Divider dashed />
            <DetailsGrid>
              <DetailItem>
                <Text type="label" weight="bold">
                  Días a pagar
                </Text>
                <Text appearance="gray" type="label">
                  {daysToPay ?? "N/A"}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Número de contrato
                </Text>
                <Text appearance="gray" type="label">
                  {contractNumber ?? "N/A"}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Nombre de la empresa
                </Text>
                <Text appearance="gray" type="label">
                  {businessName ?? "N/A"}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Tipo de contrato
                </Text>
                <Text appearance="gray" type="label">
                  {contractType ?? "N/A"}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Fecha de desembolso
                </Text>
                <Text appearance="gray" type="label">
                  {disbursementDate ?? "N/A"}
                </Text>
              </DetailItem>
            </DetailsGrid>

            <DetailItem>
              <Text type="label" weight="bold">
                Observaciones del empleado
              </Text>
              <Text appearance="gray" type="label">
                {observationEmployee ?? "N/A"}
              </Text>
            </DetailItem>
          </>
        )}
      </StyledRequestSummaryContainer>
    </Stack>
  );
}
