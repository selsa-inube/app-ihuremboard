import { useState } from "react";
import { Stack, Text, useMediaQuery, Button, Select } from "@inubekit/inubekit";
import React from "react";
import {
  MdAddCircleOutline,
  MdOutlineCheckCircle,
  MdOutlineVisibility,
} from "react-icons/md";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { AppMenu } from "@components/layout/AppMenu";
import { spacing } from "@design/tokens/spacing";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";

import CheckIcon from "@assets/images/CheckIcon.svg";
import CloseIcon from "@assets/images/CloseIcon.svg";
import HelpIcon from "@assets/images/HelpIcon.svg";

import {
  titles as tableTitles,
  requirementsMock,
} from "@mocks/TableBoard/requirements.mock";

import { IAction } from "@components/data/TableBoard/types";
import { IRoute } from "@pages/requests/types";
import {
  HumanDecision,
  HumanDecisionTranslations,
} from "@ptypes/humanResources.types";

import { ManagementUI, ITraceabilityItem } from "./Components/management";
import { RequestSummary } from "./Components/RequestSummary";
import { ActionModal } from "./Components/Actions";
import { StyledFieldsetContainer, StyledIconHowToReg } from "./styles";
import { useApplicationProcessLogic } from "./interface";
import { ITableRow } from "./types";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  description: string;
  requestLabel: string;
}

const getValidationIcon = (label: string) => {
  switch (label) {
    case "Cumple":
      return <img src={CheckIcon} alt="Cumple" width={20} height={20} />;
    case "No Cumple":
      return <img src={CloseIcon} alt="No Cumple" width={20} height={20} />;
    default:
      return <img src={HelpIcon} alt="Sin Evaluar" width={20} height={20} />;
  }
};

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

  const [showTextAreaModal, setShowTextAreaModal] = useState(false);

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
      content: (row: ITableRow) => {
        if (row.isSubTitle) return null;
        return (
          <Stack>
            <MdOutlineVisibility size={20} cursor="pointer" />
          </Stack>
        );
      },
    },
    {
      id: "enlace",
      actionName: "",
      content: (row: ITableRow) => {
        if (row.isSubTitle) return null;
        const canRegister = Math.random() > 0.5;
        return (
          <Stack>
            <StyledIconHowToReg
              size={20}
              $isEnabled={canRegister}
              onClick={
                canRegister ? () => console.log("Clic en registrar") : undefined
              }
            />
          </Stack>
        );
      },
    },
  ];

  const getActionsMobileIconStatus = (): IAction[] => [
    {
      id: "status",
      actionName: "Estado",
      content: (row: ITableRow) => {
        if (row.isSubTitle) return null;
        let label = "Sin Evaluar";
        if (typeof row?.status === "string") label = row.status;
        else if (React.isValidElement(row?.tag))
          label = row.tag.props.label ?? label;

        return (
          <Stack direction="column" alignItems="center" justifyContent="center">
            {getValidationIcon(label)}
          </Stack>
        );
      },
    },
  ];

  const showRequirements = true;
  const requirementsToShow = showRequirements ? requirementsMock : [];

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
                  >
                    Enviar
                  </Button>
                </Stack>
              </Stack>
            </Fieldset>

            <Stack margin={`${spacing.s200} 0 0 0`}>
              <Fieldset
                title="Requisitos"
                heightFieldset="304px"
                hasOverflow={true}
                activeButton={{
                  title: "Validación humana",
                  titleSistemValidation: "Validación del sistema",
                  onClick: () => console.log("Validación humana"),
                  onClickSistemValidation: () =>
                    console.log("Validación del sistema"),
                }}
              >
                {requirementsToShow.length > 0 ? (
                  <TableBoard
                    id="requisitos"
                    titles={tableTitles}
                    entries={requirementsToShow}
                    actions={getActionsMobileIcon()}
                    actionMobile={getActionsMobileIcon()}
                    actionMobileIcon={getActionsMobileIconStatus()}
                    appearanceTable={{
                      efectzebra: true,
                      borderTable: true,
                      title: "primary",
                      isStyleMobile: true,
                    }}
                    infoItems={infoItems}
                    isFirstTable={true}
                  />
                ) : (
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    padding={spacing.s200}
                    height="100%"
                  >
                    <Text appearance="gray" size="medium">
                      No hay requisitos para mostrar
                    </Text>
                  </Stack>
                )}
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
      {showTextAreaModal && (
        <TextAreaModal
          title="Agregar observaciones"
          buttonText="Confirmar"
          inputLabel="Observaciones"
          inputPlaceholder="Escribe tus comentarios..."
          description="Por favor, escribe tus observaciones antes de enviar la solicitud."
          onSubmit={(values) => {
            console.log("Texto enviado:", values.textarea);
            handleSend();
          }}
          onCloseModal={() => setShowTextAreaModal(false)}
          onSecondaryButtonClick={() => setShowTextAreaModal(false)}
        />
      )}
    </AppMenu>
  );
}

export { ApplicationProcessUI };
