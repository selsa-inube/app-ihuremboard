import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface StyledDetailProps {
  $isSmallMobile?: boolean;
  theme?: typeof inube;
}

const StyledDetail = styled.div<StyledDetailProps>`
  position: relative;
  border-radius: 8px;
  height: 0;
  top: ${({ $isSmallMobile }) => ($isSmallMobile ? "-92px" : "-80px")};
`;

export { StyledDetail };
