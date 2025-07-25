interface ISection {
  title: string;
  links: ILink[];
}

interface ILink {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface INavSection {
  name: string;
  links: Record<string, ILink>;
}

interface INav {
  title: string;
  sections: Record<string, INavSection>;
}
interface IBusinessUnit {
  abbreviatedName: string;
  businessUnitPublicCode: string;
  descriptionUse: string;
  firstMonthOfFiscalYear: string;
  languageId: string;
  urlLogo: string;
}

export type { INav, ISection, IBusinessUnit };
