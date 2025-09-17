import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Stack, Button } from "@inubekit/inubekit";
import {
  MdKeyboardArrowLeft,
  MdAutorenew,
  MdOutlineCancel,
} from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { RequestSummary } from "./Components/RequestSummary";
import { VerticalDivider } from "./Components/RequestSummary/styles";
import { spacing } from "@design/tokens/spacing";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appName, appRoute, navigatePage } = props;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state: {
      requestNumber: string;
      requestDate: string;
      staffName: string;
      title: string;
      status: string;
    };
  };

  const handleDiscard = () => console.log("Descartar solicitud");
  const handleExecute = () => console.log("Ejecutar solicitud");
  const handleAttach = () => console.log("Adjuntar archivos");
  const handleSeeAttachments = () => console.log("Ver adjuntos");

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <Stack direction="column" gap={spacing.s200}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Button
            appearance="primary"
            variant="outlined"
            onClick={() => navigate("/requests")}
            iconBefore={<MdKeyboardArrowLeft />}
            spacing="compact"
          >
            Volver
          </Button>

          <Stack direction="row" gap={spacing.s075} alignItems="center">
            <Button
              appearance="primary"
              onClick={handleExecute}
              iconBefore={<MdAutorenew />}
              spacing="compact"
            >
              Ejecutar
            </Button>
            <Button
              appearance="danger"
              onClick={handleDiscard}
              iconBefore={<MdOutlineCancel />}
              spacing="compact"
            >
              Descartar
            </Button>
            <VerticalDivider />
            <Button variant="outlined" onClick={handleAttach} spacing="compact">
              Adjuntar
            </Button>
            <Button
              variant="outlined"
              onClick={handleSeeAttachments}
              spacing="compact"
            >
              Ver adjuntos
            </Button>
          </Stack>
        </Stack>

        <RequestSummary
          requestNumber={state?.requestNumber ?? id}
          staffName={state?.staffName}
          requestDate={state?.requestDate}
          title={state?.title}
          status={state?.status}
        />
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
