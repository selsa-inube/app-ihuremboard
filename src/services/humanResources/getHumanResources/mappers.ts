import {
  IHumanDecisionTasksApi,
  IHumanDecisionTasksResponse,
} from "@ptypes/humanResources.types";

export const mapHumanDecisionTasksApiToEntity = (
  apiResponse: IHumanDecisionTasksApi,
): IHumanDecisionTasksResponse => {
  return {
    decisions: apiResponse.decisions ?? [],
    status: apiResponse.status ?? "",
  };
};
