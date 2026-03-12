import { ArgTypes } from "@storybook/react";

import { VacationTrimModalProps } from "..";

const props: Partial<ArgTypes<VacationTrimModalProps>> = {
  portalId: {
    control: "text",
    description: "ID of the portal node where the modal will be rendered",
    defaultValue: "portal",
  },
  currentReturnDate: {
    control: "text",
    description:
      "Current return date displayed in the original request fieldset",
  },
  returnDateOptions: {
    description:
      "List of available return date options for the Select input. Each option follows the IOption interface with a value and label.",
  },
  isLoading: {
    control: "boolean",
    description:
      "When true, disables form fields and shows a loading state on the submit button",
    defaultValue: false,
  },
  onCloseModal: {
    action: "onCloseModal",
    description:
      "Callback triggered when the user clicks the close button or the cancel button",
  },
  onSubmit: {
    action: "onSubmit",
    description:
      "Callback triggered when the form is submitted with valid values. Receives an object with newReturnDate and justification.",
  },
};

export { props };
