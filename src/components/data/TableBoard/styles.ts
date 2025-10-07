import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledContainer {
  $borderTable: boolean;
  $isTablet: boolean;
  $actionsMobile: boolean;
  theme: typeof inube;
}

interface IStyledThactions {
  $isTablet?: boolean;
  $isFirst?: boolean;
  theme: typeof inube;
}

interface IStyledTdactions {
  $right?: number;
  $isTablet?: boolean;
  $isFirst?: boolean;
  theme: typeof inube;
}

interface IStyledTable {
  $zebraEffect: boolean;
  $background: boolean;
  $isTablet: boolean;
  theme: typeof inube;
}

interface IStyledTdbodyContainer {
  $borderTable?: boolean;
  theme: typeof inube;
}

interface IStyledTd {
  $widthTd?: string;
}

interface IStyledWithTheme {
  theme: typeof inube;
}

export const StyledContainer = styled.div<IStyledContainer>`
  border-radius: 8px;
  max-width: 100%;
  position: relative;
  overflow-x: ${({ $isTablet }) => ($isTablet ? "auto" : "hidden")};
  border: ${({ theme, $borderTable }) =>
    $borderTable &&
    `2px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}`};
  overflow: visible;
`;

export const StyledThactions = styled.th<IStyledThactions>`
  text-align: end;
  padding: ${spacing.s0} ${spacing.s100};
`;

export const StyledTdactions = styled.td<IStyledTdactions>`
  align-items: center;
`;

export const StyledDivactions = styled.div<IStyledTdactions>`
  align-items: center;
  align-content: center;
`;

export const StyledTable = styled.table<IStyledTable>`
  border-collapse: collapse;
  width: 100%;
  box-sizing: border-box;

  tbody tr {
    background-color: ${({ theme, $background }) =>
      $background
        ? theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
        : theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  }

  thead th {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  }

  ${({ $zebraEffect, theme, $background }) =>
    $zebraEffect &&
    !$background &&
    `tbody tr:nth-child(even) {background-color: ${theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};}; tbody tr:nth-child(odd) {background-color: ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};}`}

  ${({ $isTablet, theme }) =>
    $isTablet &&
    `tbody tr {
      &:nth-child(even) ${StyledTdactions} {
        background-color: ${theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
      }
      &:nth-child(odd) ${StyledTdactions} {
        background-color: ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
      }
    }`}
`;

export const StyledTbody = styled.tbody<IStyledWithTheme>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

export const StyledThead = styled.thead<IStyledWithTheme>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

export const StyledTh = styled.th<IStyledWithTheme>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  padding: ${spacing.s050};
`;

export const StyledTr = styled.tr<IStyledTdbodyContainer>`
  height: 36px;
  vertical-align: middle;
  white-space: normal;
  box-sizing: border-box;
  border-bottom: ${({ theme, $borderTable }) =>
    $borderTable &&
    `1px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}`};

  & svg {
    padding: 0px;
  }
`;

export const StyledTd = styled.td<IStyledTd>`
  width: ${({ $widthTd }) => $widthTd};
  height: 24px;
  padding: ${spacing.s050};
`;

export const StyledTdIcon = styled.div<IStyledTd>`
  width: ${({ $widthTd }) => $widthTd};
  height: 24px;
  padding: ${spacing.s050};
`;
