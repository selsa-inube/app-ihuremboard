import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  inube,
  Stack,
  Text,
  useMediaQuery,
  Button,
  Select,
  Icon,
} from "@inubekit/inubekit";
import React from "react";
import {
  MdAddCircleOutline,
  MdOutlineCheckCircle,
  MdOutlineVisibility,
  MdOutlineHowToReg,
  MdInfoOutline,
} from "react-icons/md";

import { labels } from "@i18n/labels";
import { Logger } from "@utils/logger";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { InfoModal } from "@components/modals/InfoModal";
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
import { StyledFieldsetContainer, StyledDecisionContainer } from "./styles";
import { useApplicationProcessLogic } from "./interface";
import { ITableRow, IRequest } from "./types";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  description: string;
  requestLabel: string;
  onDeleteSuccess?: (deletedId: string) => void;
}

const getValidationIcon = (label: string) => {
  const { comply, notComply, pending } =
    labels.requests.applicationProcess.validationStatus;

  switch (label) {
    case comply:
      return <img src={CheckIcon} alt={comply} width={14} height={14} />;

    case notComply:
      return <img src={CloseIcon} alt={notComply} width={14} height={14} />;

    default:
      return <img src={HelpIcon} alt={pending} width={14} height={14} />;
  }
};

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const navigate = useNavigate();
  const { appRoute, navigatePage, onDeleteSuccess } = props;
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [showTextAreaModal, setShowTextAreaModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleDelete } = useDeleteRequest<IRequest>(() => {
    Logger.info("Elemento eliminado");
  });

  const {
    id,
    state,
    decision,
    setDecision,
    setComment,
    showActions,
    requestData,
    isLoadingRequest,
    responsibleLabel,
    loadingDecisions,
    errorDecisions,
    decisionsData,
    updatedAppRoute,
    displayRequestLabel,
    displayDescription,
    handleExecute,
    handleAttach,
    handleSeeAttachments,
    handleSend,
    loadingUpdate,
    allTasksCompleted,
    vacationValidation,
    showVacationInfo,
    openVacationInfo,
    closeVacationInfo,
  } = useApplicationProcessLogic(appRoute);

  useEffect(() => {
    setDecisionError(undefined);
  }, [decisionsData]);

  const [decisionError, setDecisionError] = useState<string | undefined>(
    undefined,
  );

  const isDisabledByVacation = vacationValidation.shouldDisable;
  const isFieldDisabled =
    Boolean(allTasksCompleted) ||
    Boolean(loadingDecisions) ||
    Boolean(isDisabledByVacation);

  const infoItems = [
    {
      icon: <MdAddCircleOutline />,
      text: labels.requests.applicationProcess.infoItems.attach,
      appearance: "help",
    },
    {
      icon: <MdOutlineCheckCircle />,
      text: labels.requests.applicationProcess.infoItems.forceApproval,
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
          <Stack
            direction="row"
            gap={spacing.s150}
            margin={`0 ${spacing.s100}`}
            alignItems="center"
            justifyContent="center"
          >
            <MdOutlineVisibility size={22} cursor="pointer" />
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

        const iconColor = canRegister
          ? inube.palette.blue.B500
          : inube.palette.neutral.N300;
        const iconCursor = canRegister ? "pointer" : "not-allowed";

        return (
          <Stack
            direction="row"
            gap={spacing.s150}
            margin={`0 ${spacing.s100}`}
            alignItems="center"
            justifyContent="center"
          >
            <MdOutlineHowToReg
              size={22}
              style={{
                color: iconColor,
                cursor: iconCursor,
                transition: "color 0.2s ease-in-out",
              }}
              onClick={
                canRegister ? () => Logger.info("Clic en registrar") : undefined
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
      actionName: labels.requests.summary.status,
      content: (row: ITableRow) => {
        if (row.isSubTitle) return null;

        const { pending } = labels.requests.applicationProcess.validationStatus;

        let label = pending;

        if (typeof row?.status === "string") {
          label = row.status;
        } else if (React.isValidElement(row?.tag)) {
          label = row.tag.props.label ?? label;
        }

        return (
          <Stack direction="column" alignItems="center" justifyContent="center">
            {getValidationIcon(label)}
          </Stack>
        );
      },
    },
  ];

  const showRequirements = false;
  const requirementsToShow = showRequirements ? requirementsMock : [];
  const hasRequirements = requirementsToShow.length > 0;

  const handleDiscard = () => {
    setIsModalOpen(true);
  };

  const decisionOptions =
    decisionsData?.decisions?.map((opt) => ({
      id: opt,
      value: opt,
      label: HumanDecisionTranslations[opt as HumanDecision] ?? opt,
    })) ?? [];

  const getSelectPlaceholder = () => {
    if (allTasksCompleted) {
      return "Todas las tareas completadas";
    }
    if (isDisabledByVacation) {
      return "Pendiente de finalización de disfrute";
    }
    if (loadingDecisions) {
      return labels.requests.applicationProcess.fieldset.loadingOptions;
    }
    if (errorDecisions) {
      return labels.requests.applicationProcess.fieldset.errorLoadingOptions;
    }
    return labels.requests.applicationProcess.fieldset.selectOptionPlaceholder;
  };

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
          fullStaffName={
            state?.fullStaffName ?? labels.requests.summary.noResponsible
          }
          humanResourceRequestData={requestData?.humanResourceRequestData}
          requestType={requestData?.humanResourceRequestType}
          isLoading={isLoadingRequest}
          handleDiscard={handleDiscard}
          handleExecute={handleExecute}
          handleAttach={handleAttach}
          handleSeeAttachments={handleSeeAttachments}
        />

        <Stack
          direction={isMobile ? "column" : "row"}
          gap={spacing.s200}
          alignItems="stretch"
        >
          <StyledFieldsetContainer $isMobile={isMobile}>
            <Fieldset
              title={labels.requests.applicationProcess.fieldset.toDoTitle}
              descriptionTitle={responsibleLabel}
            >
              <Stack direction="column" gap={spacing.s150}>
                <Text>
                  {labels.requests.applicationProcess.fieldset.verifyingText}
                </Text>

                <Stack alignItems="flex-end" gap={spacing.s150}>
                  <Select
                    name="decision"
                    id="decision"
                    label={
                      labels.requests.applicationProcess.fieldset.decisionLabel
                    }
                    placeholder={getSelectPlaceholder()}
                    options={decisionOptions}
                    value={decision}
                    onChange={(_, value) => {
                      setDecision(value);
                      setDecisionError(undefined);
                    }}
                    size="compact"
                    fullwidth
                    message={decisionError}
                    invalid={!!decisionError}
                    disabled={isFieldDisabled}
                  />
                  <StyledDecisionContainer $hasError={!!decisionError}>
                    <Stack
                      direction="row"
                      gap={spacing.s100}
                      alignItems="center"
                    >
                      <Button
                        appearance="primary"
                        variant="filled"
                        disabled={isFieldDisabled || loadingUpdate}
                        onClick={() => {
                          if (isDisabledByVacation) {
                            openVacationInfo();
                            return;
                          }

                          if (!decision) {
                            setDecisionError(
                              labels.requests.applicationProcess.validations
                                .mustSelectDecision,
                            );
                            return;
                          }

                          setDecisionError(undefined);
                          setShowTextAreaModal(true);
                        }}
                      >
                        {loadingUpdate
                          ? labels.requests.applicationProcess.fieldset.sending
                          : labels.requests.applicationProcess.fieldset.send}
                      </Button>

                      {isDisabledByVacation && (
                        <Icon
                          icon={<MdInfoOutline />}
                          size="20px"
                          appearance="primary"
                          cursorHover
                          onClick={openVacationInfo}
                        />
                      )}
                    </Stack>
                  </StyledDecisionContainer>
                </Stack>
              </Stack>
            </Fieldset>

            <Stack margin={`${spacing.s200} ${spacing.s0}`}>
              <Fieldset
                title={
                  labels.requests.applicationProcess.fieldset.requirementsTitle
                }
                heightFieldset={hasRequirements ? "325px" : "326px"}
                hasOverflow={hasRequirements}
                activeButton={{
                  title:
                    labels.requests.applicationProcess.requirements
                      .humanValidation,
                  titleSistemValidation:
                    labels.requests.applicationProcess.requirements
                      .systemValidation,
                  onClick: () => Logger.info("Validación humana"),
                  onClickSistemValidation: () =>
                    Logger.info("Validación del sistema"),
                  disabled: true,
                  disabledSistemValidation: true,
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
                      {
                        labels.requests.applicationProcess.requirements
                          .emptyState
                      }
                    </Text>
                  </Stack>
                )}
              </Fieldset>
            </Stack>
          </StyledFieldsetContainer>

          <StyledFieldsetContainer $isMobile={isMobile}>
            <ManagementUI
              isMobile={isMobile}
              traceabilityData={
                requestData?.humanResourceRequestTraceabilities?.map(
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
                ) ?? []
              }
            />
          </StyledFieldsetContainer>
        </Stack>
      </Stack>

      {showTextAreaModal && (
        <TextAreaModal
          title={labels.requests.applicationProcess.modal.title}
          buttonText={labels.requests.applicationProcess.modal.buttonText}
          inputLabel={labels.requests.applicationProcess.modal.inputLabel}
          inputPlaceholder={
            labels.requests.applicationProcess.modal.inputPlaceholder
          }
          description={labels.requests.applicationProcess.modal.description}
          onSubmit={async (values) => {
            setComment(values.textarea);
            await handleSend(values.textarea);
            setShowTextAreaModal(false);
          }}
          onCloseModal={() => setShowTextAreaModal(false)}
          onSecondaryButtonClick={() => setShowTextAreaModal(false)}
        />
      )}

      {showVacationInfo && vacationValidation.message && (
        <InfoModal
          title="Confirmación de disfrute de vacaciones"
          titleDescription="Información sobre la tarea pendiente"
          description={vacationValidation.message}
          buttonText="Entendido"
          onCloseModal={closeVacationInfo}
        />
      )}

      {isModalOpen && (
        <TextAreaModal
          title="Descartar Solicitud"
          buttonText="Descartar"
          inputLabel="Justificación"
          inputPlaceholder="Ingresa el motivo de la cancelación"
          maxLength={200}
          onCloseModal={() => setIsModalOpen(false)}
          onSubmit={async (values) => {
            if (!id || !requestData?.humanResourceRequestNumber) return;

            const success = await handleDelete(
              requestData.humanResourceRequestId,
              values.textarea,
              requestData.humanResourceRequestNumber,
            );

            if (success) {
              setIsModalOpen(false);
              if (onDeleteSuccess)
                onDeleteSuccess(requestData.humanResourceRequestId);
              navigate("/requests");
            }
          }}
        />
      )}
    </AppMenu>
  );
}

export { ApplicationProcessUI };
