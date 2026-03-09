import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { VacationTrimModal, VacationTrimModalProps } from ".";

const story: Meta<typeof VacationTrimModal> = {
  component: VacationTrimModal,
  title: "components/modals/VacationTrimModal",
};

const mockReturnDateOptions = [
  { id: "1", label: "Lunes 02/Mar/2026", value: "2026-03-02" },
  { id: "2", label: "Martes 03/Mar/2026", value: "2026-03-03" },
  { id: "3", label: "Miércoles 04/Mar/2026", value: "2026-03-04" },
  { id: "4", label: "Jueves 05/Mar/2026", value: "2026-03-05" },
  { id: "5", label: "Viernes 06/Mar/2026", value: "2026-03-06" },
];

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
  returnDateOptions: mockReturnDateOptions,
};

export default story;
