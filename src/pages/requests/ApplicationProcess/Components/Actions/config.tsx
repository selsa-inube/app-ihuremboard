import { MdOutlineCancel, MdAttachFile } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";

import { IAction } from "./types";

interface ActionsProps {
  disableExecute?: boolean;
  disableDiscard?: boolean;
  disableAttach?: boolean;
  disableSeeAttachments?: boolean;
  onExecute?: () => void;
  onDiscard?: () => void;
  onAttach?: () => void;
  onSeeAttachments?: () => void;
}

interface ActionItem {
  id: string;
  icon: JSX.Element;
  appearance: "primary" | "danger" | "dark";
  label: string;
  onClick?: () => void;
  isDisabled: boolean;
}

export const Actions = (props: ActionsProps): IAction[] => {
  const {
    disableDiscard,
    disableAttach,
    disableSeeAttachments,
    onDiscard,
    onAttach,
    onSeeAttachments,
  } = props;

  const actionItems: ActionItem[] = [
    {
      id: "discard",
      icon: <MdOutlineCancel />,
      appearance: "danger",
      label: "Descartar",
      onClick: onDiscard,
      isDisabled: disableDiscard ?? false,
    },
    {
      id: "attach",
      icon: <MdAttachFile />,
      appearance: "primary",
      label: "Adjuntar",
      onClick: onAttach,
      isDisabled: disableAttach ?? false,
    },
    {
      id: "seeAttachments",
      icon: <FaRegFileLines />,
      appearance: "dark",
      label: "Ver adjuntos",
      onClick: onSeeAttachments,
      isDisabled: disableSeeAttachments ?? false,
    },
  ];

  return actionItems;
};
