import { useState } from "react";
import {
  Text,
  useMediaQuery,
  Icon,
  Stack,
  SkeletonLine,
  IOption,
  Divider,
} from "@inubekit/inubekit";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useLocation } from "react-router-dom";

import { spacing } from "@design/tokens/spacing";
import {
  StyledRequestSummaryContainer,
  DetailsGrid,
  DetailItem,
} from "./styles";
import { formatDate } from "@utils/date";

export interface RequestSummaryProps {
  isLoading?: boolean;
  requestNumber?: string | number;
  requestDate?: string;
  title?: string;
  status?: string;
  fullStaffName?: string;
  statusOptions?: IOption[];
}

function RequestSummary(props: RequestSummaryProps) {
  const location = useLocation();
  const state = location.state as RequestSummaryProps | undefined;

  const requestNumber = props.requestNumber ?? state?.requestNumber;
  const requestDate = props.requestDate ?? state?.requestDate;
  const title = props.title ?? state?.title;
  const status = props.status ?? state?.status;
  const fullStaffName = props.fullStaffName ?? state?.fullStaffName;
  const statusOptions = props.statusOptions ?? state?.statusOptions ?? [];
  const isLoading = props.isLoading ?? false;
  const isMobile = useMediaQuery("(max-width: 710px)");

  const staffDisplayName = fullStaffName ?? "Sin responsable";

  const statusLabel =
    statusOptions.find((opt) => opt.value === status)?.label ??
    status ??
    "Sin estado";

  const [showDetails, setShowDetails] = useState(false);

  return (
    <Stack direction="column" gap={spacing.s100}>
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

      <StyledRequestSummaryContainer $isMobile={isMobile}>
        {/* Cabecera */}
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

          {/* Nombre empleado */}
          <Stack alignItems="center">
            {isLoading ? (
              <SkeletonLine animated width="120px" />
            ) : (
              <Text size="large" weight="bold">
                {staffDisplayName}
              </Text>
            )}
          </Stack>

          {/* Icono flecha */}
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

        {/* Divider + Detalles */}
        {showDetails && (
          <>
            <Divider dashed />

            <DetailsGrid>
              <DetailItem>
                <Text type="label" weight="bold">
                  Días a pagar
                </Text>
                <Text appearance="gray" type="label">
                  5
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Número de contrato
                </Text>
                <Text appearance="gray" type="label">
                  5213456
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Nombre de la empresa
                </Text>
                <Text appearance="gray" type="label">
                  Sistemas enlinea S.A
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Tipo de contrato
                </Text>
                <Text appearance="gray" type="label">
                  A término indefinido
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  Fecha de desembolso
                </Text>
                <Text appearance="gray" type="label">
                  dd/mmm/yyyy
                </Text>
              </DetailItem>
            </DetailsGrid>

            <DetailItem style={{ gridColumn: "1 / -1" }}>
              <Text type="label" weight="bold">
                Observaciones del empleado
              </Text>
              <Text appearance="gray" type="label">
                Solicito a ustedes respetuosamente este pago de vacaciones
                debido a una emergencia.
              </Text>
            </DetailItem>
          </>
        )}
      </StyledRequestSummaryContainer>
    </Stack>
  );
}

export { RequestSummary };
