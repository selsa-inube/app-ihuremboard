import {
  Stack,
  Text,
  useMediaQuery,
  Button,
  Select,
  Tag,
} from "@inubekit/inubekit";
import {
  MdAddCircleOutline,
  MdOutlineCheckCircle,
  MdOutlineVisibility,
  MdOutlineLink,
} from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { spacing } from "@design/tokens/spacing";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import type {
  IEntries as ITableEntries,
  ITitle,
  IAction,
} from "@components/data/TableBoard/types";
import { IRoute } from "@pages/requests/types";
import {
  HumanDecision,
  HumanDecisionTranslations,
} from "@ptypes/humanResources.types";

import { ManagementUI, ITraceabilityItem } from "./Components/management";
import { RequestSummary } from "./Components/RequestSummary";
import { ActionModal } from "./Components/Actions";
import { StyledFieldsetContainer } from "./styles";
import { useApplicationProcessLogic } from "./interface";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  description: string;
  requestLabel: string;
}

// --- Mock de datos --- //
const systemValidations: ITableEntries[] = [
  {
    id: "1",
    requirement: "Que el asociado sea activo",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Cumple" appearance="success" />
      </Stack>
    ),
  },
  {
    id: "2",
    requirement: "Que esté al día con las obligaciones",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Cumple" appearance="success" />
      </Stack>
    ),
  },
  {
    id: "3",
    requirement: "Que tenga más de 30 años",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Sin Evaluar" appearance="danger" />
      </Stack>
    ),
  },
];

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appRoute, navigatePage } = props;

  const isMobile = useMediaQuery("(max-width: 1000px)");

  const {
    id,
    state,
    decision,
    setDecision,
    showActions,
    setShowActions,
    requestData,
    isLoadingRequest,
    responsibleLabel,
    loading,
    error,
    loadingDecisions,
    errorDecisions,
    decisionsData,
    updatedAppRoute,
    displayRequestLabel,
    displayDescription,
    handleDiscard,
    handleExecute,
    handleAttach,
    handleSeeAttachments,
    handleSend,
  } = useApplicationProcessLogic(appRoute);

  const infoItems = [
    { icon: <MdAddCircleOutline />, text: "Adjuntar", appearance: "help" },
    {
      icon: <MdOutlineCheckCircle />,
      text: "Forzar Aprobación",
      appearance: "help",
    },
  ];

  const getActionsMobileIcon = (): IAction[] => [
    {
      id: "ver",
      actionName: "",
      content: () => (
        <Stack>
          <MdOutlineVisibility size={20} cursor="pointer" />
        </Stack>
      ),
    },
    {
      id: "enlace",
      actionName: "",
      content: () => (
        <Stack>
          <MdOutlineLink size={20} cursor="pointer" />
        </Stack>
      ),
    },
  ];

  // --- Títulos de tabla --- //
  const titles: ITitle[] = [
    { id: "requirement", titleName: "Requisito", priority: 1 },
    { id: "tag", titleName: "", priority: 2 },
  ];

  return (
    <AppMenu
      appName={displayRequestLabel}
      appRoute={updatedAppRoute}
      navigatePage={navigatePage}
      appDescription={displayDescription}
    >
      <Stack direction="column" gap={spacing.s200}>
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

        {/* --- Información principal --- */}
        <RequestSummary
          requestNumber={
            requestData?.humanResourceRequestNumber ??
            state?.requestNumber ??
            id
          }
          requestDate={
            requestData?.humanResourceRequestDate ?? state?.requestDate
          }
          title={displayRequestLabel}
          status={requestData?.humanResourceRequestStatus ?? state?.status}
          fullStaffName={state?.fullStaffName ?? "Sin responsable"}
          humanResourceRequestData={requestData?.humanResourceRequestData}
          requestType={requestData?.humanResourceRequestType}
          isLoading={isLoadingRequest}
        />

        <Stack
          direction={isMobile ? "column" : "row"}
          gap={spacing.s200}
          alignItems="stretch"
        >
          <StyledFieldsetContainer $isMobile={isMobile}>
            <Fieldset
              title="Por hacer"
              descriptionTitle={
                loading
                  ? "Cargando..."
                  : error
                    ? "Error al cargar"
                    : responsibleLabel
              }
            >
              <Stack direction="column" gap={spacing.s150}>
                <Text>Verificar viabilidad de la solicitud.</Text>

                <Stack alignItems="flex-end" gap={spacing.s150}>
                  <Select
                    name="decision"
                    id="decision"
                    label="Decisión"
                    placeholder={
                      loadingDecisions
                        ? "Cargando opciones..."
                        : errorDecisions
                          ? "Error al cargar"
                          : "Seleccione una opción"
                    }
                    options={
                      decisionsData?.decisions.map((opt) => ({
                        id: opt,
                        value: opt,
                        label:
                          HumanDecisionTranslations[opt as HumanDecision] ??
                          opt,
                      })) ?? []
                    }
                    value={decision}
                    onChange={(_, value) => setDecision(value)}
                    size="wide"
                    fullwidth
                  />
                  <Button
                    appearance="primary"
                    variant="filled"
                    onClick={handleSend}
                  >
                    Enviar
                  </Button>
                </Stack>
              </Stack>
            </Fieldset>

            <Stack margin="16px 0 0 0">
              <Fieldset
                title="Requisitos"
                heightFieldset="304px"
                hasOverflow={true}
                activeButton={{
                  title: "Validación humana",
                  titleSistemValidation: "Validación del sistema",
                  onClick: () => console.log("Clic en Validación humana"),
                  onClickSistemValidation: () =>
                    console.log("Clic en Validación del sistema"),
                }}
              >
                <TableBoard
                  id="validaciones"
                  titles={titles}
                  entries={systemValidations}
                  actions={getActionsMobileIcon()}
                  actionMobile={[]}
                  actionMobileIcon={getActionsMobileIcon()}
                  appearanceTable={{
                    efectzebra: true,
                    borderTable: true,
                    title: "primary",
                    isStyleMobile: true,
                  }}
                  infoItems={infoItems}
                />
              </Fieldset>
            </Stack>
          </StyledFieldsetContainer>
          <StyledFieldsetContainer $isMobile={isMobile}>
            <ManagementUI
              isMobile={isMobile}
              traceabilityData={(
                requestData?.humanResourceRequestTraceabilities ?? []
              ).map(
                (t): ITraceabilityItem => ({
                  id: t.traceabilityId,
                  action:
                    HumanDecisionTranslations[
                      t.actionExecuted?.toLowerCase() as HumanDecision
                    ] ?? t.actionExecuted,
                  date: t.executionDate,
                  user: t.userWhoExecutedAction,
                  comments: t.description,
                }),
              )}
            />
          </StyledFieldsetContainer>
        </Stack>
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
