import { useState } from "react";
import { Stack, Text, useMediaQuery, Button, Select } from "@inubekit/inubekit";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { AppMenu } from "@components/layout/AppMenu";
import { spacing } from "@design/tokens/spacing";
import { Fieldset } from "@components/data/Fieldset";
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

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appRoute, navigatePage } = props;

  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [showTextAreaModal, setShowTextAreaModal] = useState(false);

  const {
    id,
    state,
    decision,
    setDecision,
    setComment,
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
    loadingUpdate,
  } = useApplicationProcessLogic(appRoute);

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

        <Stack direction="column" gap={spacing.s0}>
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
                      onClick={() => setShowTextAreaModal(true)}
                      disabled={loadingUpdate}
                    >
                      {loadingUpdate ? "Enviando..." : "Enviar"}
                    </Button>
                  </Stack>
                </Stack>
              </Fieldset>
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
      </Stack>

      {showTextAreaModal && (
        <TextAreaModal
          title="Agregar observaciones"
          buttonText="Enviar"
          inputLabel="Observaciones"
          inputPlaceholder="Escribe tus comentarios..."
          description="Por favor, escribe tus observaciones antes de enviar la solicitud."
          onSubmit={async (values) => {
            setComment(values.textarea);
            await handleSend(values.textarea);
            setShowTextAreaModal(false);
          }}
          onCloseModal={() => setShowTextAreaModal(false)}
          onSecondaryButtonClick={() => setShowTextAreaModal(false)}
        />
      )}
    </AppMenu>
  );
}

export { ApplicationProcessUI };
