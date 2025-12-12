import { useParams } from "react-router-dom";

import { labels } from "@i18n/labels";

import { ExtendedLinkingRequestUI } from "./interface";

function ExtendedLinkingRequest() {
  const { id } = useParams();

  const breadcrumbs = {
    label: "Trámite de solicitud",
    crumbs: [
      {
        path: "/",
        label: labels.requests.breadcrumbs.home,
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: labels.requests.breadcrumbs.list,
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
          label: labels.requests.breadcrumbs.applicationProcess,
          id: `/requests/linking-request/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
    />
  );
}

export { ExtendedLinkingRequest };
