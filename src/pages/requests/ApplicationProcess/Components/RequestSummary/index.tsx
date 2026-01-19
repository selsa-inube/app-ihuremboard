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
  MdOutlineCancel,
  MdAutorenew,
} from "react-icons/md";

import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

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
    startDateEnjoyment,
    endDateEnjoyment,
    isVacationsEnjoyed,
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
            {labels.requests.summary.status}
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
              execute:
                labels.requests.applicationProcess.actionsMobile.cannotExecute,
              discard:
                labels.requests.applicationProcess.actionsMobile.cannotDiscard,
              attach:
                labels.requests.applicationProcess.actionsMobile.cannotAttach,
              seeAttachments:
                labels.requests.applicationProcess.actionsMobile
                  .cannotSeeAttachments,
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
              {labels.requests.actions.execute}
            </Button>
            <Button
              appearance="danger"
              onClick={handleDiscard}
              iconBefore={<MdOutlineCancel />}
              spacing="compact"
            >
              {labels.requests.actions.discard}
            </Button>
            <VerticalDivider />
            <Button variant="outlined" onClick={handleAttach} spacing="compact">
              {labels.requests.actions.attach}
            </Button>
            <Button
              variant="outlined"
              onClick={handleSeeAttachments}
              spacing="compact"
            >
              {labels.requests.actions.seeAttachments}
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
                {labels.requests.summary.requestNumberLabel}
              </Text>
              <Text appearance="gray" type="label">
                {requestNumber ?? labels.requests.summary.notAvailable}
              </Text>
            </Stack>

            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                {labels.requests.summary.requestDateLabel}
              </Text>
              <Text appearance="gray" type="label">
                {requestDate ?? labels.requests.summary.notAvailable}
              </Text>
            </Stack>

            <Stack gap={spacing.s050}>
              <Text type="label" weight="bold">
                {labels.requests.summary.requestTypeLabel}
              </Text>
              <Text appearance="gray" type="label">
                {title ?? labels.requests.summary.notAvailable}
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
                  {labels.requests.summary.daysToPay}
                </Text>
                <Text appearance="gray" type="label">
                  {daysToPay ?? labels.requests.summary.notAvailable}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  {labels.requests.summary.contractNumber}
                </Text>
                <Text appearance="gray" type="label">
                  {contractNumber ?? labels.requests.summary.notAvailable}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  {labels.requests.summary.businessName}
                </Text>
                <Text appearance="gray" type="label">
                  {businessName ?? labels.requests.summary.notAvailable}
                </Text>
              </DetailItem>

              <DetailItem>
                <Text type="label" weight="bold">
                  {labels.requests.summary.contractType}
                </Text>
                <Text appearance="gray" type="label">
                  {contractType ?? labels.requests.summary.notAvailable}
                </Text>
              </DetailItem>

              {disbursementDate && (
                <DetailItem>
                  <Text type="label" weight="bold">
                    {labels.requests.summary.disbursementDate}
                  </Text>
                  <Text appearance="gray" type="label">
                    {disbursementDate}
                  </Text>
                </DetailItem>
              )}

              {isVacationsEnjoyed && startDateEnjoyment && (
                <DetailItem>
                  <Text type="label" weight="bold">
                    Fecha de inicio de disfrute
                  </Text>
                  <Text appearance="gray" type="label">
                    {startDateEnjoyment}
                  </Text>
                </DetailItem>
              )}

              {isVacationsEnjoyed && endDateEnjoyment && (
                <DetailItem>
                  <Text type="label" weight="bold">
                    Fecha de finalización de disfrute
                  </Text>
                  <Text appearance="gray" type="label">
                    {endDateEnjoyment}
                  </Text>
                </DetailItem>
              )}
            </DetailsGrid>

            <DetailItem>
              <Text type="label" weight="bold">
                {labels.requests.summary.employeeObservations}
              </Text>
              <Text appearance="gray" type="label">
                {observationEmployee ?? labels.requests.summary.notAvailable}
              </Text>
            </DetailItem>
          </>
        )}
      </StyledRequestSummaryContainer>
    </Stack>
  );
}
