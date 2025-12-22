export const requests = {
  search: {
    placeholder: "Palabra clave",
  },

  general: {
    descripcionNoDisponible: "Descripción no disponible",
    debesSeleccionarDecision: "Debes seleccionar una decisión antes de enviar",
    noSeEncontroIdSolicitud: "No se encontró el ID de la solicitud",
    sinObservaciones: "Sin observaciones",
    sinIdentificacion: "Sin identificación",
    errorEnviarSolicitud: "Ocurrió un error al enviar la solicitud",
    ejecutarSolicitud: "Ejecutar solicitud",
    adjuntarArchivos: "Adjuntar archivos",
    verAdjuntos: "Ver adjuntos",
    errorLoading: "Error al cargar",
    loading: "Cargando...",
  },

  filters: {
    filter: "Filtrar",
    remove: "Quitar",
    filterWithCount: "Filtrar ({count})",
    clear: "Limpiar",
  },

  types: {
    unknown: "Tipo desconocido",
  },

  board: {
    emptyState:
      "No hay solicitudes que coincidan con los filtros seleccionados.",
    sections: {
      noResponsible: "Sin responsable",
      inProgress: "En progreso",
      completed: "Terminada",
    },
  },

  actions: {
    seeRequirements: "Requisitos",
    discard: "Descartar",

    execute: "Ejecutar",
    attach: "Adjuntar",
    seeAttachments: "Ver adjuntos",
  },

  takeRequestModal: {
    title: "Tomar solicitud",
    close: "Cerrar",
    description: {
      beforeRequestId: "Acabas de seleccionar la solicitud ",
      requestNumberPrefix: "No.",
      afterRequestId:
        ", puedes ser responsable para su gestión. ¿Estás de acuerdo?",
    },
    actions: {
      visualize: "Solo visualizar",
      takeRequest: "Sí, tomar solicitud",
    },
  },

  modals: {
    selectStaff: {
      title: "Cambiar responsable",
      close: "Cerrar",
      selectPlaceholder: "Selecciona un responsable",
      selectLabel: "Responsable",
      assignMe: "Asignarme a mí como responsable.",
      cancel: "Cancelar",
      save: "Guardar",
    },

    requirements: {
      title: "Requisitos",
      closeButton: "Cerrar",
    },
  },

  flags: {
    assignResponsibleSuccess: {
      title: "Responsable asignado.",
      message: "El nuevo responsable se asignó con éxito.",
    },
  },

  breadcrumbs: {
    home: "Inicio",
    list: "Solicitudes en trámite",
    applicationProcess: "Trámite de solicitud",
    process: "Trámite",
  },

  navigation: {
    vinculation: "Vinculación",
  },

  summary: {
    responsible: "Responsable:",
    noResponsible: "Sin responsable",
    status: "Estado:",
    requestNumberLabel: "No. de solicitud:",
    requestDateLabel: "Fecha de solicitud:",
    noDate: "Sin Fecha",
    notAvailable: "N/A",
    infoTitle: "Información",
    infoReasonTitle: "¿Por qué está inhabilitado?",
    requestTypeLabel: "Tipo de solicitud",
    daysToPay: "Días a pagar",
    contractNumber: "Número de contrato",
    businessName: "Nombre de la empresa",
    contractType: "Tipo de contrato",
    disbursementDate: "Fecha de desembolso",
    employeeObservations: "Observaciones del empleado",

    permissions: {
      discard: "No tiene privilegios para descartar solicitudes.",
      requirements: "No tiene privilegios para ver requisitos.",
    },
  },

  taskBoard: {
    pendingTitle: "Tareas por hacer",
    completedTitle: "Tareas hechas",

    emptyState: {
      pending: "No hay ninguna tarea pendiente por ahora.",
      completed: "Ninguna tarea está hecha por ahora.",
    },
  },

  taskCard: {
    noPrivileges: "No tienes privilegios para ejecutar esta tarea.",
    notResponsible: "Debes ser responsable de esta solicitud.",
  },

  management: {
    fieldsetTitle: "Gestión de Solicitud",
    noTraceability: "No hay trazabilidad disponible para esta solicitud.",
    placeholderMessage: "Ej.: Escribe tu mensaje",
  },

  applicationProcess: {
    fieldset: {
      toDoTitle: "Por hacer",
      requirementsTitle: "Requisitos",
      verifyingText: "Verificar viabilidad de la solicitud.",
      decisionLabel: "Decisión",
      selectOptionPlaceholder: "Seleccione una opción",
      loadingOptions: "Cargando opciones...",
      errorLoadingOptions: "Error al cargar",
      sending: "Enviando...",
      send: "Enviar",
    },

    validationStatus: {
      comply: "Cumple",
      notComply: "No Cumple",
      pending: "Sin Evaluar",
    },

    requirements: {
      humanValidation: "Validación humana",
      systemValidation: "Validación del sistema",
      emptyState: "No hay requisitos para mostrar",
    },

    infoItems: {
      attach: "Adjuntar",
      forceApproval: "Forzar Aprobación",
    },

    actionsMobile: {
      cannotExecute: "No puedes ejecutar esta acción ahora",
      cannotDiscard: "No puedes descartar esta acción ahora",
      cannotAttach: "No puedes adjuntar archivos en este momento",
      cannotSeeAttachments: "No puedes ver los adjuntos en este momento",
    },

    modal: {
      title: "Agregar observaciones",
      buttonText: "Enviar",
      inputLabel: "Observaciones",
      inputPlaceholder: "Escribe tus comentarios...",
      description:
        "Por favor, escribe tus observaciones antes de enviar la solicitud.",
    },

    validations: {
      mustSelectDecision: "Debe seleccionar una decisión.",
    },
  },
};
