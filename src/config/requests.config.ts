import { ERequestType } from "@ptypes/humanResourcesRequest.types";

interface IRequestConfig {
  label: string;
  description: string;
}

export const requestConfigs: Record<keyof typeof ERequestType, IRequestConfig> =
  {
    absence: {
      label: "Ausencia",
      description: "Solicitud para justificar ausencias en el trabajo...",
    },
    certification: {
      label: "Certificación",
      description: "Trámite para obtener certificaciones laborales...",
    },
    disability: {
      label: "Incapacidad",
      description: "Gestión de incapacidades médicas presentadas...",
    },
    leave: {
      label: "Permiso",
      description:
        "Permiso temporal solicitado por motivos personales o laborales.",
    },
    leaving_the_job: {
      label: "Retiro del trabajo",
      description: "Proceso de retiro voluntario o finalización de contrato.",
    },
    onboarding: {
      label: "Onboarding",
      description:
        "Solicitud relacionada con la vinculación de un nuevo colaborador.",
    },
    paid_vacations: {
      label: "Vacaciones pagadas",
      description: "Registro y gestión de las vacaciones pagadas...",
    },
    position_transfer: {
      label: "Cambio de cargo",
      description:
        "Trámite para gestionar un cambio de cargo dentro de la organización.",
    },
    manage_vacation_pay: {
      label: "Gestión de pago de vacaciones",
      description:
        "Proceso para gestionar el pago correspondiente a las vacaciones.",
    },
    pqr: {
      label: "PQR",
      description: "Radicación de peticiones, quejas o reclamos.",
    },
    salary_increase: {
      label: "Aumento salarial",
      description: "Solicitud de ascenso salarial por parte del colaborador.",
    },
    unpaid_leave: {
      label: "Licencia no remunerada",
      description: "Solicitud de licencia no remunerada según las políticas.",
    },
    vacations_enjoyed: {
      label: "Vacaciones a disfrutar",
      description:
        "Solicitud de aprobación de los días de vacaciones a disfrutar.",
    },
  };
