export interface IHumanResourceRequestData {
  disbursementDate?: string;
  [key: string]: unknown;
}

export interface IPatchDisbursementRequestBody {
  humanResourceRequestId: string;
  humanResourceRequestData: string;
  modifyJustification: string;
}
