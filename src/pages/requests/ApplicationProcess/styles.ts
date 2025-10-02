import styled from "styled-components";

interface IStyledFieldsetContainer {
  $isMobile: boolean;
}

export const StyledFieldsetContainer = styled.div<IStyledFieldsetContainer>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "50%")};
`;
