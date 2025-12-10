import { Meta } from "@storybook/react";

import { Logger } from "@utils/logger";

import { RequestSummary, RequestSummaryProps } from ".";

const meta: Meta<typeof RequestSummary> = {
  title: "components/RequestSummary",
  component: RequestSummary,
  argTypes: {
    canSeeRequirements: { control: "boolean" },
    isLoading: { control: "boolean" },
    staffName: { control: "text" },
    requestNumber: { control: "text" },
    requestDate: { control: "text" },
    onDiscard: { action: "Discard clicked" },
    onSeeRequirements: { action: "Requirements clicked" },
  },
};

export const Default = (args: RequestSummaryProps) => (
  <RequestSummary {...args} />
);

Default.args = {
  canDiscard: true,
  canSeeRequirements: true,
  isLoading: false,
  staffName: "John Doe",
  requestNumber: "123456",
  requestDate: "2024-03-20",
  onDiscard: () =>
    Logger.info("onDiscard clicked", { requestNumber: "123456" }),
  onSeeRequirements: () =>
    Logger.info("onSeeRequirements clicked", { requestNumber: "123456" }),
};

export const LoadingState = () => <RequestSummary isLoading={true} />;

export default meta;
