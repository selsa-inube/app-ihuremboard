import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";

import { mockPendingTasks, mockCompletedTasks } from "@config/TaskBoard.config";

import { TaskBoard, TaskBoardProps } from ".";

const meta: Meta<typeof TaskBoard> = {
  component: TaskBoard,
  title: "components/boards/TaskBoard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    pendingTasks: {
      control: "object",
      description: "List of pending task cards.",
    },
    completedTasks: {
      control: "object",
      description: "List of completed task cards.",
    },
    isResponsible: {
      control: "boolean",
      description: "true if the employe is responsible if the process.",
    },
  },
};

const Template: StoryFn<TaskBoardProps> = (args) => <TaskBoard {...args} />;

export const Default = Template.bind({});
Default.args = {
  pendingTasks: mockPendingTasks,
  completedTasks: mockCompletedTasks,
  isResponsible: true,
};

export const OnlyPendingTasks = Template.bind({});
OnlyPendingTasks.args = {
  pendingTasks: mockPendingTasks,
  completedTasks: [],
  isResponsible: true,
};

export const OnlyCompletedTasks = Template.bind({});
OnlyCompletedTasks.args = {
  pendingTasks: [],
  completedTasks: mockPendingTasks,
  isResponsible: true,
};

export const NotResponsible = Template.bind({});
NotResponsible.args = {
  pendingTasks: mockPendingTasks,
  completedTasks: mockCompletedTasks,
  isResponsible: false,
};

export default meta;
