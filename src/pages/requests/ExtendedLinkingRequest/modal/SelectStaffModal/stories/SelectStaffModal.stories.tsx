import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button, IOption } from "@inubekit/inubekit";
import { BrowserRouter } from "react-router-dom";

import { SelectStaffModal, SelectStaffModalProps } from "..";

const selectionOptions: IOption[] = [
  { id: "1", label: "staff1", value: "staff1" },
  { id: "2", label: "staff2", value: "staff2" },
  { id: "3", label: "staff3", value: "staff3" },
];

const story: Meta<typeof SelectStaffModal> = {
  component: SelectStaffModal,
  title: "components/modals/SelectStaffModal",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const DefaultTemplate: StoryFn<SelectStaffModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <SelectStaffModal {...args} onCloseModal={handleShowModal} />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Selecciona un empleado",
  portalId: "portal",
  selectionOptions,
};

export default story;
