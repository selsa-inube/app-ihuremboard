export type IModalVariant = "success" | "error";

export interface IModalAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}
