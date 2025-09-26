import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledMainProps {
  $isTablet: boolean;
  theme?: typeof inube;
}

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

const StyledMain = styled.main<StyledMainProps>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `0 ${spacing.s250} ${spacing.s0}`
      : `0 ${spacing.s800} ${spacing.s0}`};
  width: 100%;
  max-width: 1300px;
  margin: ${spacing.s450} auto 0 auto;
  box-sizing: border-box;
`;

const StyledContentImg = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${spacing.s100};
`;

const StyledLogo = styled.img`
  max-width: 100px;
  max-height: 32px;
  height: auto;
`;

const StyledQuickAccessContainer = styled.div<StyledMainProps>`
  padding: ${spacing.s200};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  display: flex;
  flex-direction: row;
  gap: ${spacing.s200};
  flex-wrap: wrap;
  border-radius: ${spacing.s100};
  justify-content: ${({ $isTablet }) => ($isTablet ? "center" : "flex-start")};

  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: ${({ $isTablet }) => ($isTablet ? "15px" : "13px")};
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  left: ${({ $isTablet }) => ($isTablet ? "160px" : "130px")};
`;

const StyledCollapse = styled.div`
  position: absolute;
  top: 48px;
  z-index: 1;
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
  StyledCollapseIcon,
  StyledCollapse,
};
