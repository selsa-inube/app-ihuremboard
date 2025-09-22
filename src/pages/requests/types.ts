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
  status: Status;
  responsible?: string;
}

interface IMockRequests {
  noResponsible: IRequest[];
  blocked: IRequest[];
  inProgress: IRequest[];
  completed: IRequest[];
}

interface BoardSections {
  sectionTitle: string;
  value: Status;
  sectionBackground: "gray" | "light";
  sectionInformation: IRequest[];
}

interface RequestItem {
  id: string;
  title: string;
  requestDate: string;
  employeeName: string;
  surnames?: string;
  hasEmployeeName?: boolean;
  status: Status;
  employeeId?: string;
  responsible?: string;
  taskName?: string;
}

type Status = "noResponsible" | "blocked" | "inProgress" | "completed";

export type {
  IRoute,
  IRequest,
  IMockRequests,
  BoardSections,
  Status,
  RequestItem,
};
