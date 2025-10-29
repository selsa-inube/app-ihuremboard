import { ArgTypes } from "@storybook/react";

import { ErrorModalProps } from "..";

const props: Partial<ArgTypes<ErrorModalProps>> = {
  buttonText: {
    control: "text",
    description: "Texto del botón principal de confirmación",
    defaultValue: "Entendido",
  },
  title: {
    control: "text",
    description: "Título del modal de error",
    defaultValue: "Error",
  },
  portalId: {
    control: "text",
    description: "ID del nodo del DOM donde se renderiza el modal",
    defaultValue: "portal",
  },
  appearance: {
    control: "select",
    options: ["primary", "secondary", "success", "warning", "danger", "help"],
    description: "Apariencia o tipo de estado visual del ícono y el botón",
    defaultValue: "warning",
  },
  descriptionText: {
    control: "text",
    description:
      "Texto descriptivo del error. Incluye detalles o un código identificador.",
    defaultValue:
      "*Descripción general del error. Incluye código identificador.",
  },
  solutionText: {
    control: "text",
    description:
      "Texto con instrucciones o recomendaciones para resolver el error.",
    defaultValue:
      "*Cómo solucionarlo: Instrucciones generales que podrían conducir a la solución del error.",
  },
  onCloseModal: {
    action: "closed",
    description: "Función ejecutada al cerrar el modal",
  },
  onSubmitButtonClick: {
    action: "submitted",
    description: "Función ejecutada al hacer clic en el botón principal",
  },
};

export { props };
