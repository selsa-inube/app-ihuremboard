import { labels } from "@i18n/labels";

export const breadcrumbs = {
  label: "Solicitudes en trámite",
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
      isActive: true,
    },
  ],
  url: "/",
};

export const RequestsNav: Record<string, { path: string }> = {
  Ausencia: { path: "/requests" },
  Certificación: { path: "/requests" },
  Incapacidad: { path: "/requests" },
  Permiso: { path: "/requests" },
  Retiro: { path: "/requests" },
  Vinculación: { path: "/requests/linking-request" },
  "Vacaciones Pagadas": { path: "/requests" },
  "Traslado de cargo": { path: "/requests" },
  PQR: { path: "/requests" },
  "Ascenso salarial": { path: "/requests" },
  "Licencia no remunerada": { path: "/requests" },
  "Vacaciones Disfrutadas": { path: "/requests" },
};
