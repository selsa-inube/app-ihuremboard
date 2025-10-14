import type { Meta, StoryObj } from "@storybook/react";

import { ManagementUI } from "../index";

const meta: Meta<typeof ManagementUI> = {
  title: "Components/ManagementUI",
  component: ManagementUI,
  argTypes: {
    isMobile: {
      control: "boolean",
      description: "Define si el chat se muestra en versión móvil.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ManagementUI>;

export const Default: Story = {
  args: {
    isMobile: false,
  },
};

export const Mobile: Story = {
  args: {
    isMobile: true,
  },
};
