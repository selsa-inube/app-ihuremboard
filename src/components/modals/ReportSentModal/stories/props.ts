import { ArgTypes } from "@storybook/react";

import { ReportSentModalProps } from "..";

const props: Partial<ArgTypes<ReportSentModalProps>> = {
  portalId: {
    control: "text",
    description: "ID del nodo portal donde se renderiza el modal",
    defaultValue: "portal",
  },
  title: {
    control: "text",
    description: "Título principal del modal",
    defaultValue: "¡Novedad registrada!",
  },
  description: {
    control: "text",
    description: "Descripción o mensaje que se muestra en el modal",
    defaultValue:
      "La novedad de recorte fue registrada con éxito. ¿Cómo quisieras continuar?",
  },
  variant: {
    control: "select",
    options: ["success", "error"],
    description: "Variante del modal (success o error)",
    defaultValue: "success",
  },
  actions: {
    description:
      "Lista de acciones que se muestran como cards en la parte inferior del modal. Cada acción recibe un icon (ReactNode), un label (string) y un onClick opcional.",
  },
};

export { props };
