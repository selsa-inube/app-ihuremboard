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
  margin: 0px;
  padding: 0px;
`;

const StyledLi = styled.li<IStyledLi>`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px 10px 7px 16px;
  gap: ${spacing.s050};
  cursor: pointer;
`;

const StyledActions = styled.div<IStyledActions>`
  border-radius: 8px;
  width: 180px;
  height: auto;
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 30px;
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
