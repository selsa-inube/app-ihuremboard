export interface IHumanResourceRequestItem {
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  removalJustification: string;
}

export interface IDeleteResponse {
  removeHumanResourcesRequest: IHumanResourceRequestItem[];
}
