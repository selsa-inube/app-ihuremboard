import { IOption } from "@inubekit/inubekit";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

export const assignmentOptions: IOption[] = Object.entries(ERequestType).map(
  ([key, label], index) => ({
    id: String(index + 1),
    label,
    value: key,
  }),
);

export const statusOptions: IOption[] = [
  { id: "noResponsible", label: "Sin responsable", value: "noResponsible" },
  { id: "inProgress", label: "En progreso", value: "inProgress" },
  { id: "completed", label: "Terminada", value: "completed" },
];
