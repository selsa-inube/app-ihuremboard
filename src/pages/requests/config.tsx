import { IOption } from "@inubekit/inubekit";

export const assignmentOptions: IOption[] = [
  { id: "1", label: "Vinculación", value: "onboarding" },
  { id: "2", label: "Vacaciones Disfrutadas", value: "vacations_enjoyed" },
  { id: "3", label: "Vacaciones Pagadas", value: "paid_vacations" },
  { id: "4", label: "Certificación", value: "certification" },
  { id: "5", label: "Incapacidad", value: "disability" },
  { id: "6", label: "Permiso", value: "leave" },
  { id: "7", label: "Licencia no remunerada", value: "unpaid_leave" },
  { id: "8", label: "Retiro", value: "leaving_the_job" },
  { id: "9", label: "Ascenso salarial", value: "salary_increase" },
  { id: "10", label: "Traslado de cargo", value: "position_transfer" },
  { id: "11", label: "Ausencia", value: "absence" },
  { id: "12", label: "pqr", value: "pqr" },
];

export const statusOptions: IOption[] = [
  { id: "pending", label: "Por evaluar", value: "pending" },
  { id: "inProgress", label: "En progreso", value: "inProgress" },
  { id: "completed", label: "Terminada", value: "completed" },
];
