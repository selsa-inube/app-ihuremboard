import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface StyledRequestSummaryContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface StyledIVerticalDividerProps {
  theme: typeof inube;
}

interface StyledIDetailItem {
  theme: typeof inube;
}

interface StyledIDetailIcon {
  theme?: typeof inube;
}

const StyledRequestSummaryContainer = styled.div<StyledRequestSummaryContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s075};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  padding: ${spacing.s200};
  margin-bottom: ${spacing.s300};
`;

const VerticalDivider = styled.div<StyledIVerticalDividerProps>`
  width: 2px;
  height: 24px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  margin: 0 ${spacing.s100};
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${spacing.s200};
  width: 100%;
`;

const DetailItem = styled.div<StyledIDetailItem>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  padding: ${spacing.s150};
  border-radius: ${spacing.s075};
`;

const StyledScissorsButton = styled.div<StyledIDetailIcon>`
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
  VerticalDivider,
  DetailsGrid,
  DetailItem,
  StyledScissorsButton,
};
