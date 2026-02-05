import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledActions {
  theme: typeof inube;
  $isMobile?: boolean;
}

const StyledDetail = styled.div<IStyledActions>`
  border-radius: 8px;
  position: relative;
  height: 0px;
  top: -55px;
`;

export { StyledDetail };
