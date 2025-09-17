import { MdAutorenew, MdOutlineCancel, MdAttachFile } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";

import { IAction } from "./type";

export const Actions = (
  disableExecute?: boolean,
  disableDiscard?: boolean,
  disableAttach?: boolean,
  disableSeeAttachments?: boolean,
  onExecute?: () => void,
  onDiscard?: () => void,
  onAttach?: () => void,
  onSeeAttachments?: () => void,
): IAction[] => {
  return [
    {
      id: "execute",
      icon: <MdAutorenew />,
      appearance: "primary",
      label: "Ejecutar",
      onClick: onExecute,
      isDisabled: disableExecute ?? false,
    },
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
};
