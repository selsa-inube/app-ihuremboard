import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

interface IDetailItem {
  theme: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  width: ${({ $smallScreen }) => ($smallScreen ? "303px" : "490px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s200 : spacing.s300};
  gap: ${spacing.s200};
  border-radius: ${spacing.s100};

  textarea {
    resize: none;
    height: 70px;
  }
`;

const DetailItem = styled.div<IDetailItem>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  padding: ${spacing.s100};
  border-radius: ${spacing.s075};
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledModal, StyledContainerClose, DetailItem };
