import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledRequestSummaryContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

const StyledRequestSummaryContainer = styled.div<StyledRequestSummaryContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s200};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N30
        ? theme.palette.neutral.N30
        : inube.palette.neutral.N30};
  padding: ${spacing.s100};
  margin-bottom: ${spacing.s300};
`;

export { StyledRequestSummaryContainer };
