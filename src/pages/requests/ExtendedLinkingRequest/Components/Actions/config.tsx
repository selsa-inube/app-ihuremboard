import { MdOutlineCheckCircle, MdClose } from "react-icons/md";
import { IIconAppearance } from "@inubekit/inubekit";

interface Action {
  label: string;
  icon: JSX.Element;
  appearance: IIconAppearance;
  onClick?: () => void;
  isDisabled?: boolean;
}

export const Actions = (
  onSeeRequirements?: () => void,
  onDiscard?: () => void,
): Action[] => [
  {
    label: "Requisitos",
    icon: <MdOutlineCheckCircle />,
    appearance: "primary",
    onClick: onSeeRequirements,
  },
  {
    label: "Descartar",
    icon: <MdClose />,
    appearance: "danger",
    onClick: onDiscard,
  },
];
