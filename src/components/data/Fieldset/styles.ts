import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledContainerFieldset {
  $isSelected: boolean;
  $isMobile: boolean;
  $aspectRatio?: string;
  $hasOverflow?: boolean;
  $isClickable?: boolean;
  $hasTable: boolean;
  $height?: string;
  $hasError?: boolean;
  $alignContent?: string;
  $borderColor?: string;
  theme: typeof inube;
}

export const StyledContainerFieldset = styled.div<IStyledContainerFieldset>`
  align-content: ${({ $alignContent, $hasError }) =>
    $alignContent ?? ($hasError ? "center" : "flex-start")};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "auto")};
  box-sizing: border-box;
  height: ${({ $height }) => $height};
  border-radius: ${spacing.s100};
  border: 1px solid;
  padding: ${spacing.s200};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  background-color: ${({ theme, $isSelected }) =>
    !$isSelected
      ? theme?.palette?.neutral?.N0 || inube.palette.neutral.N0
      : theme?.palette?.blue?.B50 || inube.palette.blue.B50};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  box-shadow: ${({ theme, $isSelected }) =>
    $isSelected &&
    `-12px 0px 0px ${theme?.palette?.blue?.B400 || inube.palette.blue.B400}`};
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  ${({ $isMobile, theme }) =>
    !$isMobile &&
    `
    &::-webkit-scrollbar {
      width: ${spacing.s100}; 
      border-radius: ${spacing.s100};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
      };
      border-radius: ${spacing.s100};
    }
  `}
`;

export const StyledPrint = styled.div`
  display: flex;
  gap: ${spacing.s100};
  @media print {
    display: none;
  }
`;

export const StyledMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledMenuDropdown = styled.div`
  position: absolute;
  bottom: ${spacing.s300};
  right: 0;
  z-index: 1000;
`;
