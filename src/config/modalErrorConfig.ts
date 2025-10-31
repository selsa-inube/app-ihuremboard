interface ModalErrorDetail {
  descriptionText: string;
  solutionText: string;
}

const modalErrorConfig: Record<number, ModalErrorDetail> = {
  1000: {
    descriptionText: "El código del portal está vacío o no es válido.",
    solutionText: "Confirma que estés usando la URL adecuada.",
  },
  1001: {
    descriptionText:
      "La compañía donde trabajas NO tiene los privilegios requeridos para acceder al portal o no hay ningún widget activo.",
    solutionText: "Contacta al administrador del sistema.",
  },
  1002: {
    descriptionText:
      "No se encontraron datos del gestor de negocios para la unidad seleccionada.",
    solutionText:
      "Verifica el código de la unidad de negocio y vuelve a intentarlo. Si el problema persiste contacta soporte.",
  },
  1003: {
    descriptionText: "No hay unidades de negocio relacionadas con el personal.",
    solutionText:
      "Verifica que el código del portal sea el correcto. Si el problema persiste, contacta al soporte técnico.",
  },
  1004: {
    descriptionText: "El usuario con que accedió no es un funcionario.",
    solutionText: "Confirma que estés usando la URL adecuada.",
  },
  1005: {
    descriptionText: "No se encontraron opciones para el empleado.",
    solutionText: "Confirma que estés usando la URL adecuada.",
  },
  1006: {
    descriptionText:
      "No se encontraron datos para el gestor de negocios. El ID proporcionado no devolvió información válida.",
    solutionText:
      "Verifica que el ID del gestor de negocios sea correcto y asegúrate de que los datos necesarios estén configurados en el sistema.",
  },
  1007: {
    descriptionText:
      "Ocurrió un error al intentar obtener los datos del gestor de negocios.",
    solutionText:
      "Intenta nuevamente más tarde o contacta al equipo de soporte con el identificador del error.",
  },
  1008: {
    descriptionText:
      "Error al obtener los datos del usuario. No fue posible recuperar la información necesaria.",
    solutionText:
      "Intenta nuevamente más tarde. Si el problema persiste, contacta al soporte.",
  },
  1009: {
    descriptionText: "No se pudo eliminar la solicitud.",
    solutionText:
      "Por favor, intenta nuevamente o contacta al soporte técnico si el problema persiste.",
  },
  1010: {
    descriptionText: "No se pudo obtener la información del empleado.",
    solutionText:
      "Verifica que el ID del empleado sea correcto. Si el problema persiste, contacta al soporte técnico.",
  },
  1011: {
    descriptionText: "No se pudo obtener la lista de empleados.",
    solutionText:
      "Intenta nuevamente más tarde. Si el problema persiste, contacta al soporte técnico.",
  },
  1012: {
    descriptionText:
      "No se pudieron obtener los días de vacaciones pendientes del empleado.",
    solutionText:
      "Verifica que el empleado tenga información de vacaciones configurada. Si el problema persiste, contacta al soporte técnico.",
  },
  1013: {
    descriptionText:
      "No se pudieron obtener las solicitudes de recursos humanos.",
    solutionText:
      "Intenta nuevamente más tarde. Si el problema persiste, contacta al soporte técnico.",
  },
  1014: {
    descriptionText: "No se pudieron obtener las opciones del menú del portal.",
    solutionText:
      "Verifica tu conexión a internet e intenta nuevamente. Si el problema persiste, contacta al soporte técnico.",
  },
  1015: {
    descriptionText: "No se pudo actualizar la solicitud de recursos humanos.",
    solutionText:
      "Verifica que los datos ingresados sean correctos e intenta nuevamente. Si el problema persiste, contacta al soporte técnico.",
  },
  1016: {
    descriptionText: "No se pudieron obtener los datos del portal.",
    solutionText:
      "Verifica tu conexión a internet e intenta nuevamente. Si el problema persiste, contacta al soporte técnico.",
  },
  1017: {
    descriptionText: "No se pudieron obtener los casos de uso del staff.",
    solutionText:
      "Verifica que el gestor de negocios y la unidad de negocio sean correctos. Si el problema persiste, contacta al soporte técnico.",
  },
  1018: {
    descriptionText:
      "No se pudo obtener la información de la cuenta de usuario del staff.",
    solutionText:
      "Verifica que el ID del usuario sea correcto. Si el problema persiste, contacta al soporte técnico.",
  },
  1019: {
    descriptionText:
      "No se pudieron obtener las opciones de asignación de perfiles de remuneración.",
    solutionText:
      "Intenta nuevamente más tarde. Si el problema persiste, contacta al soporte técnico.",
  },
};

export { modalErrorConfig };
export type { ModalErrorDetail };
