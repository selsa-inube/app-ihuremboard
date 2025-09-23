import { useParams, useLocation } from "react-router-dom";
import { Stack, useMediaQuery } from "@inubekit/inubekit";
import { useState } from "react";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { RequestSummary } from "./Components/RequestSummary";
import { ActionModal } from "./Components/Actions";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  description: string;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appName, appRoute, navigatePage, description } = props;
  const { id } = useParams<{ id: string }>();

  const { state } = useLocation() as {
    state: {
      requestNumber: string;
      requestDate: string;
      fullStaffName: string;
      title: string;
      status: string;
    };
  };

  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [showActions, setShowActions] = useState(false);

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");

  return (
    <AppMenu
      appName={appName}
      appRoute={appRoute}
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
          requestNumber={state?.requestNumber ?? id}
          requestDate={state?.requestDate}
          title={state?.title}
          status={state?.status}
          fullStaffName={state?.fullStaffName}
        />
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
