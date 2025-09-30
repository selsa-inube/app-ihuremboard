import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface StyledRequestSummaryContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface IVerticalDividerProps {
  theme: typeof inube;
}

interface IDetailItem {
  theme: typeof inube;
}

interface MobileIconContainerProps {
  $isMobile: boolean;
  $isSmall: boolean;
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

const VerticalDivider = styled.div<IVerticalDividerProps>`
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

const DetailItem = styled.div<IDetailItem>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  padding: ${spacing.s150};
  border-radius: ${spacing.s075};
`;

const MobileIconContainer = styled.div<MobileIconContainerProps>`
  position: absolute;
  z-index: 10;
  right: ${({ $isSmall, $isMobile }) =>
    $isSmall ? "10px" : $isMobile ? "60px" : "90px"};
  top: ${({ $isSmall, $isMobile }) =>
    $isSmall ? "100px" : $isMobile ? "123px" : "90px"};
`;

export {
  StyledRequestSummaryContainer,
  VerticalDivider,
  DetailsGrid,
  DetailItem,
  MobileIconContainer,
};
