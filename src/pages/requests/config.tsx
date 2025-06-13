import { IOption } from "@inubekit/inubekit";

export const assignmentOptions: IOption[] = [
  { id: "1", label: "Vinculación", value: "Onboarding" },
  { id: "2", label: "Vacaciones Disfrutadas", value: "VacationsEnjoyed" },
  { id: "3", label: "Vacaciones Pagadas", value: "PaidVacations" },
  { id: "4", label: "Certificación", value: "certification" },
  { id: "5", label: "Incapacidad", value: "disability" },
  { id: "6", label: "Permiso", value: "leave" },
  { id: "7", label: "Licencia no remunerada", value: "UnpaidLeave" },
  { id: "8", label: "Retiro", value: "leavingTheJob" },
  { id: "9", label: "Ascenso salarial", value: "salaryIncrease" },
  { id: "10", label: "Traslado de cargo", value: "PositionTransfer" },
  { id: "11", label: "Ausencia", value: "absence" },
  { id: "12", label: "PQR", value: "pqr" },
];

export const statusOptions: IOption[] = [
  { id: "pending", label: "Por evaluar", value: "pending" },
  { id: "inProgress", label: "En progreso", value: "inProgress" },
  { id: "completed", label: "Terminada", value: "completed" },
];
