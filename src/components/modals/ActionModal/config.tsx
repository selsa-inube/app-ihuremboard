import CheckIcon from "@assets/images/CheckIcon.svg";
import CloseIcon from "@assets/images/CloseIcon.svg";
import HelpIcon from "@assets/images/HelpIcon.svg";

import { IAction } from "./type";

export const Actions = (
  onClickCheck?: () => void,
  onClickClose?: () => void,
  onClickHelp?: () => void,
): IAction[] => {
  return [
    {
      icon: (
        <img
          src={CheckIcon}
          alt="Si cumple"
          style={{ width: 16, height: 16 }}
        />
      ),
      appearance: "success",
      label: "Si cumple",
      onClick: onClickCheck,
    },
    {
      icon: (
        <img
          src={CloseIcon}
          alt="No cumple"
          style={{ width: 16, height: 16 }}
        />
      ),
      appearance: "danger",
      label: "No cumple",
      onClick: onClickClose,
    },
    {
      icon: (
        <img
          src={HelpIcon}
          alt="Sin evaluar"
          style={{ width: 16, height: 16 }}
        />
      ),
      appearance: "warning",
      label: "Sin evaluar",
      onClick: onClickHelp,
    },
  ];
};
