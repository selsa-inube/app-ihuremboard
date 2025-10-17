import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledTaskCard {
  theme: typeof inube;
  $isDisabled: boolean;
  $isMobile: boolean;
}

const StyledTaskCard = styled.div<IStyledTaskCard>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  user-select: none;
  justify-content: space-between;
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "230px")};
  min-width: 220px;
  height: 130px;
  border-radius: 8px;
  gap: ${spacing.s100};
  padding: ${spacing.s150};
  box-shadow: ${({ $isDisabled, theme }) =>
    $isDisabled
      ? "none"
      : `0px 1px 3px 0px ${
          theme?.palette?.neutral?.N60 || inube.palette.neutral.N60
        }`};
  background-color: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
      : theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

export { StyledTaskCard };
