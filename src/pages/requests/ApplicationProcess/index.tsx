import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";
import { requestConfigs } from "@config/requests.config";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

function ApplicationProcess() {
  const { id } = useParams<{ id: ERequestType }>();
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const config =
    id && requestConfigs[id as ERequestType]
      ? requestConfigs[id as ERequestType]
      : null;

  const description = config?.description ?? "Descripción no disponible";

  const breadcrumbs = {
    label: "Solicitud",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: isTablet ? "..." : "...",
        id: "/requests",
        isActive: false,
      },
    ],
    url: "/requests",
  };

  return (
    <ApplicationProcessUI
      appName={breadcrumbs.label}
      appRoute={[
        ...breadcrumbs.crumbs,
        {
          path: `/requests/${id}`,
          label: "Solicitud de vacaciones pagadas",
          id: `/requests/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
      description={description}
    />
  );
}

export { ApplicationProcess };
