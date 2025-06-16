interface IRoute {
  path: string;
  label: string;
  id: string;
  isActive?: boolean;
  size?: "large" | "small";
}

interface IRequest {
  id: string;
  title: string;
  requestDate: string;
  employeeName: string;
  hasEmployeeName?: boolean;
  status: "pending" | "inProgress" | "completed";
}

interface IMockRequests {
  pending: IRequest[];
  inProgress: IRequest[];
  completed: IRequest[];
}

interface BoardSections {
  sectionTitle: string;
  value: string;
  sectionBackground: "gray" | "light";
  sectionInformation: IRequest[];
}

interface RequestItem {
  id: string;
  title: string;
  requestDate: string;
  employeeName: string;
  hasEmployeeName?: boolean;
  status: string;
}

type Status = "pending" | "inProgress" | "completed";

export type {
  IRoute,
  IRequest,
  IMockRequests,
  BoardSections,
  Status,
  RequestItem,
};
