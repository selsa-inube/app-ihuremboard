import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  height: inherit;
  width: ${({ $smallScreen }) => ($smallScreen ? "300px" : "402px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s200 : spacing.s250)};
  border-radius: ${spacing.s100};

  textarea {
    resize: none;
  }
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledModal, StyledContainerClose };
