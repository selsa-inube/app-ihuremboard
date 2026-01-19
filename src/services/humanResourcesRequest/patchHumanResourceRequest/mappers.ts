import { IHumanResourceRequestData } from "./types";

export const mapHumanResourceDataWithDisbursementDate = (
  currentData: string,
  disbursementDate: string,
): string => {
  let parsedData: IHumanResourceRequestData = {};

  try {
    parsedData = JSON.parse(currentData) as IHumanResourceRequestData;
  } catch {
    parsedData = {};
  }

  return JSON.stringify({
    ...parsedData,
    disbursementDate,
    modifyJustification:
      parsedData.modifyJustification ??
      "Registro de fecha de desembolso de vacaciones pagadas",
  });
};
