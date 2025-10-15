import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ExtendedLinkingRequestUI } from "./interface";

function ExtendedLinkingRequest() {
  const { id } = useParams();

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: "Trámite de solicitud",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: isTablet ? "..." : "Solicitudes en trámite",
        id: "/requests",
        isActive: false,
      },
    ],
    url: "/requests",
  };

  return (
    <ExtendedLinkingRequestUI
      appName={breadcrumbs.label}
      appRoute={[
        ...breadcrumbs.crumbs,
        {
          path: `/requests/linking-request/${id}`,
          label: "Trámite de solicitud",
          id: `/requests/linking-request/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
    />
  );
}

export { ExtendedLinkingRequest };
