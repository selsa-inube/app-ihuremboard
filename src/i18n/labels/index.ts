import { requests } from "./requests";
import { home } from "./home";
import { modal } from "./modal";
import { layout } from "./layout";
import { cards } from "./cards";
import { utils } from "./utils";
import { data } from "./data";
import { validations } from "./validations";

export const labels = {
  requests,
  home,
  modal,
  layout,
  cards,
  utils,
  data,
  validations,
};

export type Labels = typeof labels;
