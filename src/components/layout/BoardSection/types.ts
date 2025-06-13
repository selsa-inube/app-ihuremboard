import { IOption } from "@inubekit/inubekit";

type SectionBackground = "gray" | "light";

type SectionOrientation = "horizontal" | "vertical";

interface ICreditRequest {
  creditRequestCode?: string;
  clientName?: string;
  creditRequestDateOfCreation?: string;
  userWhoPinnnedId?: string;
  title: string;
  count?: string;
  message?: string;
}

interface IBoardSectionProps {
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: ICreditRequest[];
  errorLoadingPins: boolean;
  searchRequestValue: string;
  selectedFilters: IOption[];
  children?: React.ReactNode;
}
export type {
  SectionBackground,
  SectionOrientation,
  ICreditRequest,
  IBoardSectionProps,
};
