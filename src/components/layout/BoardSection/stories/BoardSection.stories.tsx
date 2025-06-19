import { BrowserRouter } from "react-router-dom";
import { Meta, StoryObj } from "@storybook/react";

import { boardSectionConfig } from "@mocks/BoardSection/boardSection.mock";
import { props } from "./props";
import { BoardSection } from "..";

type Story = StoryObj<typeof BoardSection>;

const boardSection: Meta<typeof BoardSection> = {
  component: BoardSection,
  title: "layouts/BoardSection",
  argTypes: props,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const generateStory = (config: typeof boardSectionConfig.Default): Story => ({
  args: {
    ...config,
  },
});

export const Default: Story = generateStory(boardSectionConfig.Default);
export const ThreeRequests: Story = generateStory(
  boardSectionConfig.ThreeRequests,
);
export const FiveRequests: Story = generateStory(
  boardSectionConfig.FiveRequests,
);

export default boardSection;
