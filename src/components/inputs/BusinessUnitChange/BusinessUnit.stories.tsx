import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { Logger } from "@utils/logger";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";

import { BusinessUnitChange } from "./index";

const mockBusinessUnits: IBusinessUnit[] = [
  {
    businessUnitPublicCode: "BU1",
    urlLogo: "https://via.placeholder.com/50",
    abbreviatedName: "Unit 1",
    descriptionUse: "Description 1",
    firstMonthOfFiscalYear: "1",
    languageId: "en",
  },
  {
    businessUnitPublicCode: "BU2",
    urlLogo: "https://via.placeholder.com/50",
    abbreviatedName: "Unit 2",
    descriptionUse: "Description 2",
    firstMonthOfFiscalYear: "1",
    languageId: "en",
  },
];

const meta: Meta<typeof BusinessUnitChange> = {
  title: "components/BusinessUnitChange",
  component: BusinessUnitChange,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof BusinessUnitChange> = (args) => (
  <BusinessUnitChange {...args} />
);

export const Default = Template.bind({});
Default.args = {
  businessUnits: mockBusinessUnits,
  selectedClient: "Unit 1",
  onLogoClick: (businessUnit) =>
    Logger.info("Business unit logo clicked", { businessUnit }),
};
