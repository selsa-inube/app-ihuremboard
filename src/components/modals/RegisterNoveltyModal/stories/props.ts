import { ArgTypes } from "@storybook/react";

import { RegisterNoveltyModalProps } from "..";

const props: Partial<ArgTypes<RegisterNoveltyModalProps>> = {
  portalId: {
    control: "text",
    description: "ID of the portal node where the modal will be rendered",
    defaultValue: "portal",
  },
  title: {
    control: "text",
    description: "Main title of the modal",
    defaultValue: "Novelty registered!",
  },
  description: {
    control: "text",
    description: "Description or message displayed inside the modal",
    defaultValue:
      "The trim novelty was successfully registered. How would you like to continue?",
  },
  subdescription: {
    control: "text",
    description:
      "Optional secondary description displayed below the main description",
  },
  variant: {
    control: "select",
    options: ["success", "error"],
    description: "Modal variant (success or error)",
    defaultValue: "success",
  },
  actions: {
    description:
      "List of actions displayed as cards at the bottom of the modal. Each action receives an icon (ReactNode), a label (string), and an optional onClick.",
  },
};

export { props };
