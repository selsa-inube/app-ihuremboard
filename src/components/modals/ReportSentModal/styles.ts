import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

interface IStyledCard {
  $smallScreen: boolean;
  theme?: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  width: ${({ $smallScreen }) => ($smallScreen ? "303px" : "402px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${spacing.s300};
  border-radius: ${spacing.s100};
`;

const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${spacing.s200};
  width: 100%;
`;

const StyledCard = styled.div<IStyledCard>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  padding: ${spacing.s100};
  width: 90px;
  flex-direction: column;
  gap: ${spacing.s050};
  border-radius: 8px;
  outline: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30};
  box-sizing: border-box;
  cursor: pointer;
`;

export { StyledModal, StyledActionsContainer, StyledCard };
