import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { DisbursementDateModal, DisbursementDateModalProps } from "..";

const story: Meta<typeof DisbursementDateModal> = {
  component: DisbursementDateModal,
  title: "components/modals/DisbursementDateModal",
};

const DefaultTemplate: StoryFn<DisbursementDateModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (disbursementDate: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      console.log("Fecha seleccionada:", disbursementDate);
    }, 1000);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>

      {showModal && (
        <DisbursementDateModal
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
};

export default story;
