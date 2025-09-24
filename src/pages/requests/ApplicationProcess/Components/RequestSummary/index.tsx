import { useState } from "react";
import {
  Text,
  useMediaQuery,
  Icon,
  Stack,
  SkeletonLine,
  IOption,
  Button,
  Divider,
} from "@inubekit/inubekit";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdMoreVert,
  MdAutorenew,
  MdOutlineCancel,
} from "react-icons/md";
import { useLocation } from "react-router-dom";

import { spacing } from "@design/tokens/spacing";
import { formatDate } from "@utils/date";
import {
  StyledRequestSummaryContainer,
  DetailsGrid,
  DetailItem,
  VerticalDivider,
} from "./styles";
import { ActionModal } from "../Actions";

/**
 * Estructura esperada de los datos de la solicitud.
 * Se agregan todos los campos que tu lógica ya usa.
 */
export interface HumanResourceRequestData {
  daysToPay?: string | number;
  daysOff?: string | number;
  startDate?: string;
  startDateEnyoment?: string;
  contractNumber?: string;
  contractId?: string;
  businessName?: string;
  contractType?: string;
  observationEmployee?: string;
  addressee?: string;
  // Puedes agregar más campos según la API
}

export interface RequestSummaryProps {
  isLoading?: boolean;
  requestNumber?: string | number;
  requestDate?: string;
  title?: string;
  status?: string;
  fullStaffName?: string;
  statusOptions?: IOption[];
  humanResourceRequestData?: HumanResourceRequestData;
  requestType?: string;
}

function RequestSummary({
  isLoading: propsIsLoading,
  requestNumber: propsRequestNumber,
  requestDate: propsRequestDate,
  title: propsTitle,
  status: propsStatus,
  fullStaffName: propsFullStaffName,
  statusOptions: propsStatusOptions,
  humanResourceRequestData: propsHumanResourceRequestData,
  requestType: propsRequestType,
}: RequestSummaryProps) {
  const location = useLocation();
  const state = location.state as RequestSummaryProps | undefined;

  const requestNumber = propsRequestNumber ?? state?.requestNumber;
  const requestDate = propsRequestDate ?? state?.requestDate;
  const title = propsTitle ?? state?.title;
  const status = propsStatus ?? state?.status;
  const fullStaffName = propsFullStaffName ?? state?.fullStaffName;
  const statusOptions = propsStatusOptions ?? state?.statusOptions ?? [];
  const humanResourceRequestData =
    propsHumanResourceRequestData ?? state?.humanResourceRequestData ?? {};
  const requestType = propsRequestType ?? state?.requestType;

  const parsedData: HumanResourceRequestData = humanResourceRequestData ?? {};

  // Normalización de campos
  let daysToPay = "N/A";
  let startDate: string | undefined = undefined;
  let contractNumber = "N/A";
  let businessName = "N/A";
  let contractType = "N/A";
  let observationEmployee = "N/A";

  if (requestType === "vacations_enjoyed" || requestType === "paid_vacations") {
    daysToPay =
      parsedData.daysToPay?.toString() ??
      parsedData.daysOff?.toString() ??
      "N/A";
    startDate =
      parsedData.startDate ?? parsedData.startDateEnyoment ?? undefined;
  } else if (requestType === "certification") {
    daysToPay = "-";
    startDate = undefined;
  }

  contractNumber = parsedData.contractNumber ?? parsedData.contractId ?? "N/A";
  businessName = parsedData.businessName ?? "N/A";
  contractType = parsedData.contractType ?? "N/A";
  observationEmployee =
    parsedData.observationEmployee ?? parsedData.addressee ?? "N/A";

  const isLoading = propsIsLoading ?? false;
  const isMobile = useMediaQuery("(max-width: 1050px)");
  const [showActions, setShowActions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const staffDisplayName = fullStaffName ?? "Sin responsable";

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
      {/* Estado + acciones */}
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
          <Icon
            icon={<MdMoreVert />}
            appearance="dark"
            size="24px"
            cursorHover
            onClick={() => setShowActions(true)}
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

      {/* Modal acciones en móvil */}
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

      {/* Resumen */}
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

          {/* Responsable */}
          <Stack alignItems="center">
            {isLoading ? (
              <SkeletonLine animated width="120px" />
            ) : (
              <Text size="large" weight="bold">
                {staffDisplayName}
              </Text>
            )}
          </Stack>

          {/* Toggle detalles */}
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

        {/* Detalles */}
        {showDetails && (
          <>
            <Divider dashed />

            <DetailsGrid>
              <DetailItem>
                <Text type="label" weight="bold">
                  Días a pagar
                </Text>
                <Text appearance="gray" type="label">
                  {daysToPay}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Número de contrato
                </Text>
                <Text appearance="gray" type="label">
                  {contractNumber}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Nombre de la empresa
                </Text>
                <Text appearance="gray" type="label">
                  {businessName}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Tipo de contrato
                </Text>
                <Text appearance="gray" type="label">
                  {contractType}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Fecha de desembolso
                </Text>
                <Text appearance="gray" type="label">
                  {startDate ? formatDate(startDate) : "N/A"}
                </Text>
              </DetailItem>
            </DetailsGrid>

            <DetailItem>
              <Text type="label" weight="bold">
                Observaciones del empleado
              </Text>
              <Text appearance="gray" type="label">
                {observationEmployee}
              </Text>
            </DetailItem>
          </>
        )}
      </StyledRequestSummaryContainer>
    </Stack>
  );
}

export { RequestSummary };
