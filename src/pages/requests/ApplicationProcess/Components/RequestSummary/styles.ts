import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface IStyledRequestSummaryContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface IStyledVerticalDivider {
  theme?: typeof inube;
}

interface IStyledDetailItem {
  theme?: typeof inube;
}

interface IStyledScissorsButton {
  theme?: typeof inube;
}

const StyledRequestSummaryContainer = styled.div<IStyledRequestSummaryContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s075};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  padding: ${spacing.s200};
  margin-bottom: ${spacing.s300};
`;

const StyledVerticalDivider = styled.div<IStyledVerticalDivider>`
  width: 2px;
  height: 24px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  margin: 0 ${spacing.s100};
`;

const StyledDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${spacing.s200};
  width: 100%;
`;

const StyledDetailItem = styled.div<IStyledDetailItem>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  padding: ${spacing.s150};
  border-radius: ${spacing.s075};
`;

const StyledScissorsButton = styled.div<IStyledScissorsButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) =>
    theme?.palette?.blue?.B400 || inube.palette.blue.B400};
  border-radius: ${spacing.s075};
  cursor: pointer;
  flex-shrink: 0;

  & svg {
    color: white;
    font-size: 20px;
  }
`;

export {
  StyledRequestSummaryContainer,
  StyledVerticalDivider,
  StyledDetailsGrid,
  StyledDetailItem,
  StyledScissorsButton,
};
