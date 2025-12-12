import { requests } from "./requests";
import { home } from "./home";
import { modal } from "./modal";
import { layout } from "./layout";
import { cards } from "./cards";

export const labels = {
  requests,
  home,
  modal,
  layout,
  cards,
};

export type Labels = typeof labels;
