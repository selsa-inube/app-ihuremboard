import styled from "styled-components";
import { MdOutlineHowToReg } from "react-icons/md";
import { inube } from "@inubekit/inubekit";

interface IStyledIconHowToReg {
  $isEnabled: boolean;
  theme?: typeof inube;
}

interface IStyledFieldsetContainer {
  $isMobile: boolean;
}

export const StyledFieldsetContainer = styled.div<IStyledFieldsetContainer>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "50%")};
`;

export const StyledIconHowToReg = styled(
  MdOutlineHowToReg,
)<IStyledIconHowToReg>`
  color: ${({ $isEnabled, theme }) =>
    $isEnabled
      ? theme?.palette?.blue?.B500 || inube.palette.blue.B500
      : theme?.palette?.neutral?.N300 || inube.palette.neutral.N300};
  cursor: ${({ $isEnabled }) => ($isEnabled ? "pointer" : "not-allowed")};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ $isEnabled, theme }) =>
      $isEnabled
        ? theme?.palette?.blue?.B500 || inube.palette.blue.B500
        : theme?.palette?.neutral?.N300 || inube.palette.neutral.N300};
  }
`;
