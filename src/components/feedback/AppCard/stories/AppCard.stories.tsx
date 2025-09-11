import { BrowserRouter } from "react-router-dom";
import { MdOutlineBeachAccess } from "react-icons/md";
import { StoryFn, Meta } from "@storybook/react";

import { AppCard, AppCardProps } from "..";

const meta: Meta<typeof AppCard> = {
  component: AppCard,
  title: "feedback/AppCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<AppCardProps> = (args) => <AppCard {...args} />;

export const WithComplements = Template.bind({});
WithComplements.args = {
  title: "Vacaciones",
  description: "Descripción",
  icon: <MdOutlineBeachAccess />,
  complement: [
    "Complemento: A",
    "Complemento: B",
    "Complemento: C",
    "Complemento: D",
  ],
  url: "/privileges",
};

export const WithoutComplements = Template.bind({});
WithoutComplements.args = {
  title: "Vacaciones",
  description: "Descripción",
  icon: <MdOutlineBeachAccess />,
  url: "/privileges",
};

export default meta;
