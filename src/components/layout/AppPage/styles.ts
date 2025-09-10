import { Link } from "react-router-dom";
import styled from "styled-components";

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

interface IStyledMain {
  $fullWidth: boolean;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledScrollableContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const StyledContainer = styled.div`
  display: inherit;
  overflow: hidden;

  nav {
    height: 100%;
  }
`;

const StyledMain = styled.main<IStyledMain>`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "1192px")};
`;

const StyledMainScroll = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
`;
const StyledContentImg = styled(Link)`
  width: 100px;
  text-decoration: none;
  color: inherit;
`;

const StyledLogo = styled.img`
  max-width: 100px;
  max-height: 32px;
  height: auto;
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
  StyledCollapse,
  StyledCollapseIcon,
  StyledMainScroll,
  StyledScrollableContainer,
};
