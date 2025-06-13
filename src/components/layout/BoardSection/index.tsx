import { MdOutlineChevronRight } from "react-icons/md";
import { Stack, Icon, Text } from "@inubekit/inubekit";

import {
  StyledBoardSection,
  StyledCollapseIcon,
  StyledEmptyContainer,
} from "./styles";
import { useBoardSectionLogic } from "./interface";
import { ICreditRequest, IBoardSectionProps } from "./types";

function BoardSection(props: IBoardSectionProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    children,
  } = props;

  const { collapse, handleCollapse, getNoDataMessage, isTablet, isMobile } =
    useBoardSectionLogic(props);

  const isVertical = orientation === "vertical";
  const isEmpty = sectionInformation.length === 0;

  const disabledCollapse = false;

  const titleType = isVertical || isMobile ? "title" : "headline";
  const titleSize = isVertical || isMobile ? "large" : "medium";

  const shouldShowContent = isVertical || !collapse;

  return (
    <StyledBoardSection
      $sectionBackground={sectionBackground}
      $orientation={orientation}
      $isTablet={isTablet}
    >
      <Stack
        justifyContent={isVertical ? "space-between" : "flex-start"}
        alignItems="end"
        gap="24px"
      >
        <Stack alignItems="end" gap="8px">
          {!isVertical && (
            <StyledCollapseIcon
              $collapse={collapse}
              $disabledCollapse={disabledCollapse}
              onClick={handleCollapse}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                disabled={disabledCollapse}
                appearance="dark"
                size="26px"
                cursorHover
              />
            </StyledCollapseIcon>
          )}
          <Text type={titleType} size={titleSize}>
            {sectionTitle}
          </Text>
        </Stack>

        <Text type="title" size="medium">
          {sectionInformation.length}/{sectionInformation.length || 0}
        </Text>
      </Stack>

      {shouldShowContent && (
        <Stack
          wrap="wrap"
          alignItems="center"
          direction={isVertical ? "column" : "row"}
          justifyContent={isMobile || isTablet ? "center" : "flex-start"}
          gap="20px"
        >
          {!isEmpty ? (
            children
          ) : (
            <StyledEmptyContainer>
              <Text type="title" size="small" appearance="gray">
                {getNoDataMessage()}
              </Text>
            </StyledEmptyContainer>
          )}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSection };
export type { IBoardSectionProps, ICreditRequest };
