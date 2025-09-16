const breadcrumbs = {
  label: "Solicitudes en trámite",
  url: "/",
};

const RequestsNav: Record<string, { path: string }> = {
  "Vacaciones Pagadas": { path: "/requests/holiday-request" },
  "Vacaciones Disfrutadas": { path: "/requests/holiday-request" },
};

export { breadcrumbs, RequestsNav };
