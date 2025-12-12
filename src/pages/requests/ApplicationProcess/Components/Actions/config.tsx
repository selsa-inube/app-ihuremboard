import { MdAutorenew, MdOutlineCancel, MdAttachFile } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";

import { labels } from "@i18n/labels";

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
    disableExecute,
    disableDiscard,
    disableAttach,
    disableSeeAttachments,
    onExecute,
    onDiscard,
    onAttach,
    onSeeAttachments,
  } = props;

  const actionItems: ActionItem[] = [
    {
      id: "execute",
      icon: <MdAutorenew />,
      appearance: "primary",
      label: labels.requests.actions.execute,
      onClick: onExecute,
      isDisabled: disableExecute ?? false,
    },
    {
      id: "discard",
      icon: <MdOutlineCancel />,
      appearance: "danger",
      label: labels.requests.actions.discard,
      onClick: onDiscard,
      isDisabled: disableDiscard ?? false,
    },
    {
      id: "attach",
      icon: <MdAttachFile />,
      appearance: "primary",
      label: labels.requests.actions.attach,
      onClick: onAttach,
      isDisabled: disableAttach ?? false,
    },
    {
      id: "seeAttachments",
      icon: <FaRegFileLines />,
      appearance: "dark",
      label: labels.requests.actions.seeAttachments,
      onClick: onSeeAttachments,
      isDisabled: disableSeeAttachments ?? false,
    },
  ];

  return actionItems;
};
