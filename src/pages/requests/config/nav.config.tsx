const breadcrumbs = {
  label: "Solicitudes en trámite",
  url: "/",
};

const RequestsNav: Record<string, { path: string }> = {
  "Vacaciones Pagadas": { path: "/holiday-request" },
  "Vacaciones Disfrutadas": { path: "/holiday-request" },
};

export { breadcrumbs, RequestsNav };
