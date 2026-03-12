import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { mockTrimReturnDateOptions } from "@mocks/mockDataTrim/mockDataTrim";

import { VacationTrimModal, VacationTrimModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof VacationTrimModal> = {
  component: VacationTrimModal,
  title: "components/modals/VacationTrimModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<VacationTrimModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (values: {
    newReturnDate: string;
    justification: string;
  }) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      console.log("Valores enviados:", values);
    }, 1000);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>

      {showModal && (
        <VacationTrimModal
          {...args}
          isLoading={isLoading}
          onCloseModal={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  portalId: "portal",
  currentReturnDate: "05/Mar/2026",
  returnDateOptions: mockTrimReturnDateOptions,
};

export default story;
