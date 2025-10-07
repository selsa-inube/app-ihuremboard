import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface Theme {
  palette: {
    neutral: {
      N0: string;
      N40: string;
    };
  };
}

const StyledContainer = styled.div<{ offsetTop?: number }>`
  position: absolute;
  right: 175px;
  top: ${({ offsetTop }) => (offsetTop ? `${offsetTop + 2}px` : "30px")};

  figure {
    margin-right: ${spacing.s050};
  }

  div > figure {
    position: absolute;
    right: 2%;
    top: ${spacing.s200};
  }
`;

const StyledUl = styled.ul`
  margin: ${spacing.s0} ${spacing.s300} ${spacing.s0} ${spacing.s0};
  padding: ${spacing.s0};
`;

const StyledLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  padding: ${spacing.s075} ${spacing.s0};
`;

const StyledActions = styled.div<{ theme?: Theme }>`
  border-radius: ${spacing.s100};
  position: absolute;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 8px 2px 6px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export { StyledContainer, StyledUl, StyledLi, StyledActions };
