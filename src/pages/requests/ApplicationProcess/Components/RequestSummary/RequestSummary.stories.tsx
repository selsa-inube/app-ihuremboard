import { Meta } from "@storybook/react";

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

export const LoadingState = () => <RequestSummary isLoading={true} />;

export default meta;
