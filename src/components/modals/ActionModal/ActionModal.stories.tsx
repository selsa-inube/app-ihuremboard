import { Meta, StoryObj } from "@storybook/react";
import { ActionModal } from "./index";

const meta: Meta<typeof ActionModal> = {
  title: "Components/Modals/ActionModal",
  component: ActionModal,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClose: { action: "onClose" },
    onClickDetails: { action: "onClickDetails" },
    onClickEdit: { action: "onClickEdit" },
    onClickEliminate: { action: "onClickEliminate" },
    disableDeleteAction: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof ActionModal>;

export const Default: Story = {
  args: {
    disableDeleteAction: false,
  },
};

export const DeleteDisabled: Story = {
  args: {
    disableDeleteAction: true,
  },
};
