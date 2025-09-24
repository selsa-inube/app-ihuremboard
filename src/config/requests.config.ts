import { ERequestType } from "@ptypes/humanResourcesRequest.types";

interface IRequestConfig {
  description: string;
}

export const requestConfigs: Record<ERequestType, IRequestConfig> = {
  [ERequestType.absence]: {
    description:
      "Solicitud para justificar ausencias en el trabajo, de acuerdo con las políticas de la empresa.",
  },
  [ERequestType.certification]: {
    description:
      "Trámite para obtener certificaciones laborales emitidas por la organización.",
  },
  [ERequestType.disability]: {
    description:
      "Gestión de incapacidades médicas presentadas por el empleado.",
  },
  [ERequestType.leave]: {
    description:
      "Permiso temporal solicitado por el empleado por motivos personales o laborales.",
  },
  [ERequestType.leaving_the_job]: {
    description: "Proceso de retiro voluntario o finalización de contrato.",
  },
  [ERequestType.onboarding]: {
    description:
      "Solicitud relacionada con la vinculación de un nuevo colaborador.",
  },
  [ERequestType.paid_vacations]: {
    description:
      "Permite al empleado registrar y gestionar las vacaciones pagadas de acuerdo con su contrato laboral.",
  },
  [ERequestType.position_transfer]: {
    description:
      "Trámite para gestionar un cambio de cargo dentro de la organización.",
  },
  [ERequestType.pqr]: {
    description:
      "Radicación de peticiones, quejas o reclamos por parte del empleado.",
  },
  [ERequestType.salary_increase]: {
    description: "Solicitud de ascenso salarial por parte del colaborador.",
  },
  [ERequestType.unpaid_leave]: {
    description:
      "Solicitud de licencia no remunerada según las políticas de la empresa.",
  },
  [ERequestType.vacations_enjoyed]: {
    description:
      "El empleado solicita la aprobación de los días de vacaciones a disfrutar según disponibilidad.",
  },
};
