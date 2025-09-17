import { Meta, StoryFn } from "@storybook/react";

import { RequestSummary, RequestSummaryProps } from ".";

const meta: Meta<typeof RequestSummary> = {
  title: "components/RequestSummary",
  component: RequestSummary,
  argTypes: {
    staffName: { control: "text" },
    requestNumber: { control: "text" },
    requestDate: { control: "text" },
    title: { control: "text" },
    status: { control: "text" },
    isLoading: { control: "boolean" },
  },
};

export const Default: StoryFn<RequestSummaryProps> = (args) => (
  <RequestSummary {...args} />
);

Default.args = {
  staffName: "Juan Pérez",
  requestNumber: "REQ-12345",
  requestDate: "2025-09-17T10:30:00.000Z",
  title: "Vacaciones Pagadas",
  status: "Aprobada",
};

export const LoadingState = () => <RequestSummary isLoading={true} />;

export default meta;
