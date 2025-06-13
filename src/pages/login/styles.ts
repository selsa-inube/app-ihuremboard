import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledWelcomeContainer {
  theme?: typeof inube;
}

interface IStyledOutletContainer {
  theme?: typeof inube;
}

interface IStyledLogo {
  $screenMobile: boolean;
  theme?: typeof inube;
}

const StyledWelcomeContainer = styled.div<IStyledWelcomeContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledOutletContainer = styled(
  StyledWelcomeContainer,
)<IStyledOutletContainer>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const StyledLogo = styled.img<IStyledLogo>`
  width: ${({ $screenMobile }) => ($screenMobile ? "90px" : "124px")};
  margin-top: ${spacing.s200};
`;

export { StyledWelcomeContainer, StyledOutletContainer, StyledLogo };
