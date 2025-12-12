import { useParams } from "react-router-dom";

import { labels } from "@i18n/labels";
import { requestConfigs } from "@config/requests.config";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

import { ApplicationProcessUI } from "./index";

function ApplicationProcess() {
  const { id } = useParams<{ id?: keyof typeof ERequestType }>();

  const safeId = String(id ?? "");

  const config = id ? requestConfigs[id] : null;

  const description = id
    ? (ERequestType[id] ?? labels.requests.general.descripcionNoDisponible)
    : labels.requests.general.descripcionNoDisponible;

  const requestLabel = config?.label ?? "Solicitud";

  const breadcrumbLabel =
    requestLabel.toLowerCase() === "solicitud"
      ? `Solicitud de ${description}`
      : requestLabel;

  const breadcrumbs = {
    crumbs: [
      {
        path: "/",
        label: labels.requests.breadcrumbs.home,
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: labels.requests.breadcrumbs.process,
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
