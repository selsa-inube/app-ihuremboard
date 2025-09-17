import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";

function ApplicationProcess() {
  const { id } = useParams();

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: "Solicitud de vacaciones pagadas",
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
    />
  );
}

export { ApplicationProcess };
