import styled from "styled-components";

interface IFieldsetContainerProps {
  $isMobile: boolean;
}

export const StyledFieldsetContainer = styled.div<IFieldsetContainerProps>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "50%")};
  margin-top: -20px;
`;
