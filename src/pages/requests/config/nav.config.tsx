export const breadcrumbs = {
  label: "Solicitudes en trámite",
  crumbs: [
    {
      path: "/",
      label: "Inicio",
      id: "/",
      isActive: false,
    },
    {
      path: "/requests",
      label: "Solicitudes en trámite",
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
