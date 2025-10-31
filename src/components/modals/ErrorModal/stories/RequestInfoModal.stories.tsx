import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { ErrorModal, ErrorModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof ErrorModal> = {
  component: ErrorModal,
  title: "components/modals/ErrorModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<ErrorModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && <ErrorModal {...args} onCloseModal={handleShowModal} />}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {};

export default story;
