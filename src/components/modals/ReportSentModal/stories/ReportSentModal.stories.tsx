import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Stack } from "@inubekit/inubekit";
import { MdOutlineHome, MdClose, MdOutlineHistory } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";

import { ReportSentModal } from "..";
import { props } from "./props";

const meta: Meta<typeof ReportSentModal> = {
  title: "components/modals/ReportSentModal",
  component: ReportSentModal,
  argTypes: props,
};

export default meta;

type Story = StoryObj<typeof ReportSentModal>;

export const Default: Story = {
  args: {
    title: "¡Novedad registrada!",
    description:
      "La novedad de recorte fue registrada con éxito. ¿Cómo quisieras continuar?",
    variant: "success",
  },
  render: (args) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Button onClick={() => setShowModal(true)}>Open Modal</Button>
        {showModal && (
          <ReportSentModal
            {...args}
            actions={[
              {
                icon: <MdOutlineHome />,
                label: "Volver a inicio",
                onClick: () => setShowModal(false),
              },
              {
                icon: <MdClose />,
                label: "Cerrar emergente",
                onClick: () => setShowModal(false),
              },
            ]}
          />
        )}
      </>
    );
  },
};

export const Success: Story = {
  ...Default,
  args: {
    title: "Operación exitosa",
    description: "La operación se completó correctamente.",
    variant: "success",
  },
};

export const Error: Story = {
  ...Default,
  args: {
    title: "Error en el servicio",
    description:
      "Debido a un problema, no pudimos enviar el código para validar tu identidad.",
    variant: "error",
  },
};

export const ThreeActions: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Button onClick={() => setShowModal(true)}>
          Abrir Modal con 3 acciones
        </Button>
        {showModal && (
          <ReportSentModal
            title="¡Novedad registrada!"
            description="La novedad de recorte fue registrada con éxito. ¿Cómo quisieras continuar?"
            variant="success"
            actions={[
              {
                icon: <MdOutlineHome />,
                label: "Volver a inicio",
                onClick: () => setShowModal(false),
              },
              {
                icon: <MdOutlineHistory />,
                label: "Ver historial",
                onClick: () => setShowModal(false),
              },
              {
                icon: <MdClose />,
                label: "Cerrar emergente",
                onClick: () => setShowModal(false),
              },
            ]}
          />
        )}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Ejemplo con tres acciones disponibles en el modal.",
      },
    },
  },
};

export const Comparison: Story = {
  render: () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    return (
      <>
        <Stack gap={spacing.s200}>
          <Button onClick={() => setShowSuccessModal(true)}>
            Abrir Modal de Éxito
          </Button>
          <Button onClick={() => setShowErrorModal(true)}>
            Abrir Modal de Error
          </Button>
        </Stack>

        {showSuccessModal && (
          <ReportSentModal
            title="¡Novedad registrada!"
            description="La novedad de recorte fue registrada con éxito. ¿Cómo quisieras continuar?"
            variant="success"
            actions={[
              {
                icon: <MdOutlineHome />,
                label: "Volver a inicio",
                onClick: () => setShowSuccessModal(false),
              },
              {
                icon: <MdClose />,
                label: "Cerrar emergente",
                onClick: () => setShowSuccessModal(false),
              },
            ]}
          />
        )}

        {showErrorModal && (
          <ReportSentModal
            title="Error en el servicio"
            description="Debido a un problema, no pudimos enviar el código para validar tu identidad."
            variant="error"
            actions={[
              {
                icon: <MdOutlineHome />,
                label: "Volver a inicio",
                onClick: () => setShowErrorModal(false),
              },
              {
                icon: <MdClose />,
                label: "Cerrar emergente",
                onClick: () => setShowErrorModal(false),
              },
            ]}
          />
        )}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Comparación de ambas variantes del modal (success y error).",
      },
    },
  },
};
