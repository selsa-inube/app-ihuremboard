import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { SectionBackground, SectionOrientation } from "./types";
interface IStyledBoardSection {
  theme?: typeof inube;
  $sectionBackground?: SectionBackground;
  $orientation?: SectionOrientation;
  $isTablet: boolean;
}
interface IStyledCollapseIcon {
  $collapse: boolean;
  $disabledCollapse: boolean;
}

const StyledBoardSection = styled.div<IStyledBoardSection>`
  display: flex;
  gap: ${spacing.s150};
  flex-direction: column;
  padding: 10px 12px 12px;
  width: calc(100% - 24px);
  border-top: 1px solid;
  border-bottom: ${({ $orientation }) =>
    $orientation !== "horizontal" ? "1px solid" : "none"};
  border-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  background-color: ${({ theme, $sectionBackground }) =>
    $sectionBackground === "gray"
      ? theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
      : theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};

  min-height: ${({ $isTablet }) => ($isTablet ? "auto" : "585px")};

  & > div:nth-child(1) {
    justify-content: space-between;
    margin-right: ${({ $isTablet }) => ($isTablet ? "20px" : "0px")};
  }
`;
const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(90deg)" : "rotate(0deg)"};
  cursor: ${({ $disabledCollapse }) =>
    $disabledCollapse ? "not-allowed" : "pointer"};
`;

const StyledEmptyContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { StyledBoardSection, StyledCollapseIcon, StyledEmptyContainer };
