import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";
import { requestConfigs } from "@config/requests.config";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

function ApplicationProcess() {
  const { id } = useParams<{ id?: keyof typeof ERequestType }>();
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const safeId = String(id ?? "");

  const config = id ? requestConfigs[id] : null;

  const description = id
    ? (ERequestType[id] ?? "Descripción no disponible")
    : "Descripción no disponible";

  const requestLabel = config?.label ?? "Solicitud";

  const breadcrumbLabel =
    requestLabel.toLowerCase() === "solicitud"
      ? `Solicitud de ${description}`
      : requestLabel;

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
          path: `/requests/${safeId}`,
          label: breadcrumbLabel,
          id: `/requests/${safeId}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
      description={description}
      requestLabel={requestLabel}
    />
  );
}

export { ApplicationProcess };
