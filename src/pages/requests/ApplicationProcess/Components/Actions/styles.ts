import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface IStyledActions {
  theme: typeof inube;
}

interface IStyledLi {
  theme: typeof inube;
  $isDisabled: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;

const StyledUl = styled.ul`
  margin: ${spacing.s0};
  padding: ${spacing.s0};
`;

const StyledLi = styled.li<IStyledLi>`
  list-style: none;
  display: flex;
  align-items: center;
  padding: ${spacing.s100} ${spacing.s100} ${spacing.s050} ${spacing.s200};
  gap: ${spacing.s050};
  cursor: pointer;
`;

interface IStyledActions {
  theme: typeof inube;
  $isMobile?: boolean;
}

const StyledActions = styled.div<IStyledActions>`
  border-radius: 8px;
  width: 180px;
  height: 140px;
  position: fixed;
  z-index: 9999;
  right: ${({ $isMobile }) => ($isMobile ? "28px" : "75px")};
  top: ${({ $isMobile }) => ($isMobile ? "160px" : "190px")};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledCloseIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
`;

export { StyledContainer, StyledUl, StyledLi, StyledActions, StyledCloseIcon };
