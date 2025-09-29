import { useParams, useLocation } from "react-router-dom";
import { Stack, Text, useMediaQuery, Button, Select } from "@inubekit/inubekit";
import { useState, useEffect } from "react";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { requestConfigs } from "@config/requests.config";
import { capitalizeFullName } from "@utils/string";
import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { useEvaluateResponsibleOfTasks } from "@hooks/useEvaluateResponsibleOfTasks";
import { useHeaders } from "@hooks/useHeaders";

import { StyledFieldsetContainer } from "./styles";
import { RequestSummary } from "./Components/RequestSummary";
import { ActionModal } from "./Components/Actions";
import { Fieldset } from "@components/data/Fieldset";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  description: string;
  requestLabel: string;
}

function isRequestConfigKey(
  value: string,
): value is keyof typeof requestConfigs {
  return value in requestConfigs;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appRoute, navigatePage } = props;
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation() as {
    state?: {
      requestNumber?: string;
      requestDate?: string;
      fullStaffName?: string;
      title?: string;
      status?: string;
      statusOptions?: { value: string; label: string }[];
    };
  };

  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [showActions, setShowActions] = useState(false);
  const [decision, setDecision] = useState<string>("");

  const requestNumberParam = state?.requestNumber ?? id ?? "";
  const { data: requestData, isLoading: isLoadingRequest } =
    useHumanResourceRequest(requestNumberParam);

  const rawLabel =
    requestData?.humanResourceRequestDescription ?? state?.title ?? "";
  const parts = rawLabel.trim().split(" ");
  const keyCandidate = parts[parts.length - 1];

  const finalRequestLabel = isRequestConfigKey(keyCandidate)
    ? requestConfigs[keyCandidate].label
    : rawLabel;

  const config = Object.values(requestConfigs).find(
    (cfg) => cfg.label.toLowerCase() === finalRequestLabel.toLowerCase(),
  );

  const displayRequestLabel =
    finalRequestLabel.toLowerCase() === "solicitud"
      ? finalRequestLabel
      : `Solicitud de ${config?.label ?? finalRequestLabel}`;

  const displayDescription = config?.description ?? "Descripción no disponible";

  const updatedAppRoute = appRoute.map((crumb) =>
    crumb.id === `/requests/${id}`
      ? { ...crumb, label: displayRequestLabel }
      : crumb,
  );

  const headers = useHeaders();
  const [resolvedHeaders, setResolvedHeaders] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    const fetchHeaders = async () => {
      const h = await headers.getHeaders();
      setResolvedHeaders(h);
    };
    fetchHeaders();
  }, []);

  const {
    data: responsibleData,
    loading,
    error,
  } = useEvaluateResponsibleOfTasks({
    requestId: id ?? "",
    headers: resolvedHeaders ?? {},
    enabled: !!resolvedHeaders,
  });

  const responsibleLabel =
    !responsibleData || responsibleData.responsible?.length !== 1
      ? "Sin responsable"
      : `${responsibleData.responsible[0].names} ${responsibleData.responsible[0].surnames}`;

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");
  const handleSend = () => console.log("Decisión seleccionada:", decision);

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
          title={finalRequestLabel}
          status={requestData?.humanResourceRequestStatus ?? state?.status}
          fullStaffName={capitalizeFullName(
            state?.fullStaffName ?? "Sin responsable",
          )}
          humanResourceRequestData={requestData?.humanResourceRequestData}
          requestType={requestData?.humanResourceRequestType}
          isLoading={isLoadingRequest}
        />

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

              <Stack direction="row" alignItems="flex-end" gap={spacing.s150}>
                <Select
                  name="decision"
                  id="decision"
                  label="Decisión"
                  placeholder="Seleccione una opción"
                  options={
                    state?.statusOptions?.map((opt) => ({
                      id: opt.value,
                      value: opt.value,
                      label: opt.label,
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
        </StyledFieldsetContainer>
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
