import { IDeleteResponse } from "@services/humanResourcesRequest/deleteHumanResourceRequest/types";

const mapRequestBody = (
  id: string,
  justification: string,
  number: string,
): IDeleteResponse => ({
  removeHumanResourcesRequest: [
    {
      humanResourceRequestDescription: justification,
      humanResourceRequestId: id,
      humanResourceRequestNumber: number,
      removalJustification: justification,
    },
  ],
});

export { mapRequestBody };
