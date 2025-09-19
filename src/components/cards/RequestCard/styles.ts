import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface IStyledRequestCard {
  theme: typeof inube;
  $isMobile: boolean;
}

interface IStyledTitle {
  theme: typeof inube;
}

const StyledRequestCard = styled.div<IStyledRequestCard>`
  width: ${({ $isMobile }) => ($isMobile ? "280px" : "242px")};
  height: ${({ $isMobile }) => ($isMobile ? "280px" : "312px")};
  display: flex;
  flex-direction: column;
  gap: ${spacing.s100};
  padding: ${spacing.s150};
  border-radius: 8px;
  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-sizing: border-box;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const StyledTitle = styled.div<IStyledTitle>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme?.palette?.blue?.B50 ?? inube.palette.blue.B50};
  font-weight: bold;
  border-radius: 4px;
  gap: ${spacing.s100};
  height: 20px;
  text-align: center;
`;

export { StyledRequestCard, StyledTitle };
