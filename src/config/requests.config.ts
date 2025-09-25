import { ERequestType } from "@ptypes/humanResourcesRequest.types";

interface IRequestConfig {
  label: string;
  description: string;
}

export const requestConfigs: Record<ERequestType, IRequestConfig> = {
  [ERequestType.absence]: {
    label: "Ausencia",
    description:
      "Solicitud para justificar ausencias en el trabajo, de acuerdo con las políticas de la empresa.",
  },
  [ERequestType.certification]: {
    label: "Certificación",
    description:
      "Trámite para obtener certificaciones laborales emitidas por la organización.",
  },
  [ERequestType.disability]: {
    label: "Incapacidad",
    description:
      "Gestión de incapacidades médicas presentadas por el empleado.",
  },
  [ERequestType.leave]: {
    label: "Permiso",
    description:
      "Permiso temporal solicitado por el empleado por motivos personales o laborales.",
  },
  [ERequestType.leaving_the_job]: {
    label: "Retiro",
    description: "Proceso de retiro voluntario o finalización de contrato.",
  },
  [ERequestType.onboarding]: {
    label: "Onboarding",
    description:
      "Solicitud relacionada con la vinculación de un nuevo colaborador.",
  },
  [ERequestType.paid_vacations]: {
    label: "Vacaciones pagadas",
    description:
      "Permite al empleado registrar y gestionar las vacaciones pagadas de acuerdo con su contrato laboral.",
  },
  [ERequestType.position_transfer]: {
    label: "Cambio de cargo",
    description:
      "Trámite para gestionar un cambio de cargo dentro de la organización.",
  },
  [ERequestType.pqr]: {
    label: "PQR",
    description:
      "Radicación de peticiones, quejas o reclamos por parte del empleado.",
  },
  [ERequestType.salary_increase]: {
    label: "Aumento salarial",
    description: "Solicitud de ascenso salarial por parte del colaborador.",
  },
  [ERequestType.unpaid_leave]: {
    label: "Licencia no remunerada",
    description:
      "Solicitud de licencia no remunerada según las políticas de la empresa.",
  },
  [ERequestType.vacations_enjoyed]: {
    label: "Vacaciones a disfrutar",
    description:
      "El empleado solicita la aprobación de los días de vacaciones a disfrutar según disponibilidad.",
  },
};
