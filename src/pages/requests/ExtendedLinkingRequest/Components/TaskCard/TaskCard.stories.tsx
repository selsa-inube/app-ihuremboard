import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";
import { MdOutlineAndroid } from "react-icons/md";

import { TaskCard, TaskCardProps } from ".";

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
  title: "components/cards/TaskCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the task card.",
    },
    title: { control: "text", description: "Title of the task card." },
    description: {
      control: "text",
      description: "Description of the task card.",
    },
    hasNoPrivileges: {
      control: "boolean",
      description: "Indicates if the user lacks privileges.",
    },
    isNotResponsible: {
      control: "boolean",
      description: "Indicates if the user is not responsible for the task.",
    },
    icon: {
      control: "object",
      description: "Icon displayed in the task card.",
    },
  },
};

const Template: StoryFn<TaskCardProps> = (args) => <TaskCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "1",
  title: "Lorem ipsum",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  icon: <MdOutlineAndroid />,
};

export default meta;
