import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { RequestSummary } from ".";
import type { ComponentProps } from "react";

type RequestSummaryProps = ComponentProps<typeof RequestSummary>;

const meta: Meta<typeof RequestSummary> = {
  title: "components/RequestSummary",
  component: RequestSummary,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    fullStaffName: { control: "text" },
    requestNumber: { control: "text" },
    requestDate: { control: "text" },
    title: { control: "text" },
    status: { control: "text" },
    isLoading: { control: "boolean" },
  },
};

export const Default: StoryFn<RequestSummaryProps> = (
  args: RequestSummaryProps,
) => <RequestSummary {...args} />;

Default.args = {
  fullStaffName: "Juan Pérez",
  requestNumber: "REQ-12345",
  requestDate: "2025-09-17T10:30:00.000Z",
  title: "Vacaciones Pagadas",
  status: "Aprobada",
};

export const LoadingState = () => <RequestSummary isLoading={true} />;

export default meta;
