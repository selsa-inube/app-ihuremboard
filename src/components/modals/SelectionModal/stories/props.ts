import { ArgTypes } from "@storybook/react";

import { SelectionModalProps } from "..";

const props: Partial<ArgTypes<SelectionModalProps>> = {
  descriptionText: {
    control: "text",
    description: "Text displayed as the description in the modal",
    required: true,
  },
  buttonText: {
    control: "text",
    description: "Text for the primary submit button",
  },
  title: {
    control: "text",
    description: "Title of the modal",
  },
  portalId: {
    control: "text",
    description: "ID of the portal node for rendering the modal",
  },
  secondaryButtonText: {
    control: "text",
    description: "Text for the secondary button",
  },
  onCloseModal: {
    action: "closed",
    description: "Function triggered when the modal is closed",
  },
  onSubmitButtonClick: {
    action: "submitted",
    description: "Function triggered when the submit button is clicked",
  },
  onSecondaryButtonClick: {
    action: "secondaryButtonClicked",
    description: "Function triggered when the secondary button is clicked",
  },
};

export { props };
