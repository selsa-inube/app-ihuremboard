import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledRadioClient {
  theme: typeof inube;
}

const StyledRadioClient = styled.label<IStyledRadioClient>`
  & div {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 58px;
    max-height: 72px;
    box-shadow: 0px 1px 3px 1px
      ${({ theme }) =>
        theme?.palette?.neutralAlpha?.N40A || inube.palette.neutralAlpha.N40A};
    border-radius: ${spacing.s100};
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    border: 1px solid
      ${({ theme }) =>
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    cursor: pointer;
  }
`;

const StyledRadio = styled.input`
  width: 12px;
  height: 16px;
  margin: 0px;

  &:checked ~ img {
    filter: grayscale(0%);
  }
`;

const StyledImage = styled.img`
  width: 60%;
  transition: filter 500ms ease-out;
  filter: grayscale(100%);
  display: block;
  margin-left: auto;

  @media screen and (max-width: 460px) {
    display: none;
  }
`;

export { StyledRadioClient, StyledImage, StyledRadio };
