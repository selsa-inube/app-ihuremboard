import { MdOutlineCheckCircle, MdClose } from "react-icons/md";
import { IIconAppearance } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";

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
    label: labels.requests.actions.seeRequirements,
    icon: <MdOutlineCheckCircle />,
    appearance: "primary",
    onClick: onSeeRequirements,
  },
  {
    label: labels.requests.actions.discard,
    icon: <MdClose />,
    appearance: "danger",
    onClick: onDiscard,
  },
];
