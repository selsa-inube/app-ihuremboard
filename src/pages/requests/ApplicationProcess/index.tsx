import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";
import { requestConfigs } from "@config/requests.config";

function ApplicationProcess() {
  const { id } = useParams<{ id: string }>();
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const config = Object.values(requestConfigs).find(
    (cfg) => cfg.label.toLowerCase() === (id ?? "").toLowerCase(),
  );

  const description = config?.description ?? "Descripción no disponible";
  const requestLabel = config?.label ?? "Solicitud";

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
      requestLabel={requestLabel}
    />
  );
}

export { ApplicationProcess };
