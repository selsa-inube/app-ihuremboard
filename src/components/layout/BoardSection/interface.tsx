import { useState } from "react";
import { useMediaQueries } from "@inubekit/inubekit";

import { configOption } from "./config";
import { IBoardSectionProps } from "./types";

interface BoardSectionLogic {
  collapse: boolean;
  handleCollapse: () => void;
  getNoDataMessage: () => string;
  isTablet: boolean;
  isMobile: boolean;
}

function useBoardSectionLogic(props: IBoardSectionProps): BoardSectionLogic {
  const { sectionInformation, searchRequestValue, selectedFilters } = props;

  const isEmpty = sectionInformation.length === 0;

  const { "(max-width: 1024px)": isTablet, "(max-width: 595px)": isMobile } =
    useMediaQueries(["(max-width: 1024px)", "(max-width: 595px)"]);

  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  const getNoDataMessage = () => {
    if (searchRequestValue || selectedFilters.length > 0) {
      return isEmpty ? configOption.noMatches : "";
    }
    return isEmpty ? configOption.textNodata : "";
  };

  return {
    collapse,
    handleCollapse,
    getNoDataMessage,
    isTablet,
    isMobile,
  };
}

export { useBoardSectionLogic };
