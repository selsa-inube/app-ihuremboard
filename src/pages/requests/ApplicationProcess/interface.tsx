import { useParams, useLocation } from "react-router-dom";
import { Stack, useMediaQuery } from "@inubekit/inubekit";
import { useState } from "react";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { RequestSummary } from "./Components/RequestSummary";
import { ActionModal } from "./Components/Actions";
import { useHumanResourceRequest } from "@hooks/useHumanResourceRequestById";
import { requestConfigs } from "@config/requests.config";
import { capitalizeFullName } from "@utils/string";
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
  const { appRoute, navigatePage, description } = props;
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

  const requestNumberParam = state?.requestNumber ?? id ?? "";

  const { data: requestData, isLoading: isLoadingRequest } =
    useHumanResourceRequest(requestNumberParam);

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");

  const rawLabel =
    requestData?.humanResourceRequestDescription ?? state?.title ?? "";
  const parts = rawLabel.trim().split(" ");
  const keyCandidate = parts[parts.length - 1];

  const finalRequestLabel = isRequestConfigKey(keyCandidate)
    ? requestConfigs[keyCandidate].label
    : rawLabel;

  const displayRequestLabel =
    finalRequestLabel.toLowerCase() === "solicitud"
      ? finalRequestLabel
      : `Solicitud de ${finalRequestLabel}`;

  const updatedAppRoute = appRoute.map((crumb) =>
    crumb.id === `/requests/${id}`
      ? { ...crumb, label: displayRequestLabel }
      : crumb,
  );

  return (
    <AppMenu
      appName={displayRequestLabel}
      appRoute={updatedAppRoute}
      navigatePage={navigatePage}
      appDescription={description}
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
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
