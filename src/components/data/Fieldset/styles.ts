import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

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
  border-radius: 8px;
  border: 1px solid;
  padding-top: ${({ $hasTable }) => !$hasTable && "16px"};
  padding-bottom: ${({ $hasTable }) => !$hasTable && "16px"};
  padding-right: ${({ $hasTable }) => !$hasTable && "8px"};
  padding-left: ${({ $hasTable }) => !$hasTable && "8px"};
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
      width: 8px; 
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
      };
      border-radius: 8px;
    }
  `}
`;

export const StyledPrint = styled.div`
  display: flex;
  gap: 8px;
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
  bottom: 30px;
  right: 0;
  z-index: 1000;
`;
