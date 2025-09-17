const breadcrumbs = {
  label: "Solicitudes en trámite",
  url: "/",
};

const RequestsNav: Record<string, { path: string }> = {
  Ausencia: { path: "/requests" },
  Certificación: { path: "/requests" },
  Incapacidad: { path: "/requests" },
  Permiso: { path: "/requests" },
  Retiro: { path: "/requests" },
  "Vacaciones Pagadas": { path: "/requests" },
  "Traslado de cargo": { path: "/requests" },
  PQR: { path: "/requests" },
  "Ascenso salarial": { path: "/requests" },
  "Licencia no remunerada": { path: "/requests" },
  "Vacaciones Disfrutadas": { path: "/requests" },
};

export { breadcrumbs, RequestsNav };
