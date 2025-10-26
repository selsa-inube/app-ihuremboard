import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledFieldsetContainer {
  $isMobile: boolean;
}

interface IStyledDecisionContainer {
  $hasError?: boolean;
  theme?: typeof inube;
}

export const StyledFieldsetContainer = styled.div<IStyledFieldsetContainer>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "50%")};
`;
export const StyledDecisionContainer = styled.div<IStyledDecisionContainer>`
  transform: ${({ $hasError }) =>
    $hasError ? "translateY(-20px)" : "translateY(0)"};
`;
