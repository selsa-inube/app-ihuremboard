import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { SelectionModal, SelectionModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof SelectionModal> = {
  component: SelectionModal,
  title: "components/modals/SelectionModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<SelectionModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && <SelectionModal {...args} onCloseModal={handleShowModal} />}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  descriptionText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
};

export default story;
