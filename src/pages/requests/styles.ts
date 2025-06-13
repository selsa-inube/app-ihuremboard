import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IBoardContainer {
  $isTablet: boolean;
  theme?: typeof inube;
}

interface IRequestsContainer {
  $isTablet: boolean;
  theme?: typeof inube;
}

interface IMenuContainer {
  $isMobile: boolean;
  $isTablet?: boolean;
  theme?: typeof inube;
}

interface IMenuIconContainer {
  theme?: typeof inube;
}

interface ISearchContainer {
  $isTablet: boolean;
}

const StyledBoardContainer = styled.div<IBoardContainer>`
  display: grid;
  grid-template-columns: ${({ $isTablet }) =>
    $isTablet ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))"};
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  border-top: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
`;

const StyledRequestsContainer = styled.div<IRequestsContainer>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $isTablet, theme }) =>
    !$isTablet &&
    `
      padding: ${spacing.s250};
      gap: ${spacing.s250};
      border-radius: ${spacing.s100};
      border: 1px solid ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    `}
`;

const SearchContainer = styled.div<ISearchContainer>`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ $isTablet }) =>
    $isTablet ? spacing.s150 : spacing.s100};
`;

const StyledMenuContainer = styled.div<IMenuContainer>`
  position: absolute;
  background: white;
  border-radius: ${spacing.s100};
  box-shadow: 0px 4px 8px
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${spacing.s100};
  z-index: 1000;
  width: ${({ $isTablet }) => ($isTablet ? "162px" : "120px")};

  top: ${({ $isMobile, $isTablet }) => {
    if ($isMobile) return "150px";
    return $isTablet ? "195px" : "216px";
  }};

  right: ${({ $isMobile, $isTablet }) => {
    if ($isMobile) return "15px";
    return $isTablet ? "65px" : "60px";
  }};
`;

const StyledMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.s100};
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StyledMenuIconContainer = styled.div<IMenuIconContainer>`
  position: relative;
  top: -50px;
  right: 16px;
  z-index: 1;
  width: 0px;
`;

export {
  StyledRequestsContainer,
  StyledBoardContainer,
  SearchContainer,
  StyledMenuContainer,
  StyledMenuButton,
  StyledMenuIconContainer,
};
