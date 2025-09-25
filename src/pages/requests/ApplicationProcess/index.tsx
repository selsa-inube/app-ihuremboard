import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";
import { requestConfigs } from "@config/requests.config";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

function ApplicationProcess() {
  const { id } = useParams<{ id: ERequestType }>();
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const config = id ? requestConfigs[id as ERequestType] : null;
  const description = config?.description ?? "Descripción no disponible";
  const requestLabel = config?.label ?? "Solicitud";
  const requestTypeLabel =
    requestLabel.toLowerCase() === "solicitud" ? requestLabel : requestLabel;

  const breadcrumbLabel =
    requestLabel.toLowerCase() === "solicitud"
      ? requestLabel
      : `Solicitud de ${requestLabel}`;

  const breadcrumbs = {
    crumbs: [
      { path: "/", label: "Inicio", id: "/", isActive: false },
      {
        path: "/requests",
        label: isTablet ? "..." : "Solicitudes",
        id: "/requests",
        isActive: false,
      },
    ],
    url: "/requests",
  };

  return (
    <ApplicationProcessUI
      appName={breadcrumbLabel}
      appRoute={[
        ...breadcrumbs.crumbs,
        {
          path: `/requests/${id}`,
          label: breadcrumbLabel,
          id: `/requests/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
      description={description}
      requestLabel={requestTypeLabel}
    />
  );
}

export { ApplicationProcess };
