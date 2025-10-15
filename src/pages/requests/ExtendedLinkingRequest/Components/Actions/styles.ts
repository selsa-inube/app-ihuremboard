import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledActions {
  theme: typeof inube;
}

interface IStyledLi {
  theme?: typeof inube;
  $isDisabled?: boolean;
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
  padding: ${spacing.s075} ${spacing.s450} ${spacing.s075} ${spacing.s150};
  gap: ${spacing.s050};
  cursor: pointer;
`;

const StyledActions = styled.div<IStyledActions>`
  border-radius: 8px;
  width: 162px;
  height: 72px;
  position: absolute;
  z-index: 1;
  right: 11px;
  top: 100%;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledCloseIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
`;

export { StyledContainer, StyledUl, StyledLi, StyledActions, StyledCloseIcon };
