import type { IEntries } from "@components/data/TableBoard/types";
export interface IStaffInfo {
  id: string;
  name: string;
}

export interface ITableRow extends IEntries {
  isSubTitle?: boolean;
}

export interface IRequest {
  id: string;
  requestId?: string;
}
