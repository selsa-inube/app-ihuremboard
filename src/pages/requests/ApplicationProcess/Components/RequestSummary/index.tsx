import {
  Text,
  useMediaQuery,
  Icon,
  Stack,
  SkeletonLine,
  IOption,
} from "@inubekit/inubekit";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";

import { spacing } from "@design/tokens/spacing";
import { formatDate } from "@utils/date";

import { StyledRequestSummaryContainer } from "./styles";

export interface RequestSummaryProps {
  isLoading?: boolean;
  requestNumber?: string | number;
  requestDate?: string;
  title?: string;
  status?: string;
  fullStaffName?: string;
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
  const isMobile = useMediaQuery("(max-width: 710px)");

  const staffDisplayName = fullStaffName ?? "Sin responsable";

  const statusLabel =
    statusOptions.find((opt) => opt.value === status)?.label ??
    status ??
    "Sin estado";

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
