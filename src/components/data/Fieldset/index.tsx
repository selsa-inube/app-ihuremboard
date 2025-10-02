import { useState } from "react";
import { MdAdd, MdOutlineMoreVert } from "react-icons/md";
import { Stack, Text, useMediaQuery, Button, Icon } from "@inubekit/inubekit";

import {
  StyledContainerFieldset,
  StyledMenuContainer,
  StyledPrint,
} from "./styles";
import { FieldsetProps } from "./types";

export const Fieldset = (props: FieldsetProps) => {
  const {
    children,
    title,
    aspectRatio,
    heightFieldset,
    descriptionTitle,
    activeButton,
    hasTable = false,
    hasOverflow = false,
    isClickable = false,
    selectedState = false,
    hasError = false,
    borderColor = "normal",
    alignContent,
    onSelectionChange,
  } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const [isSelected, setIsSelected] = useState(selectedState || false);

  const handleOnClick = () => {
    if (isClickable) {
      setIsSelected(!isSelected);
      onSelectionChange?.();
    }
  };

  return (
    <Stack
      direction="column"
      gap="8px"
      width="-webkit-fill-available"
      height={!isMobile ? heightFieldset : "auto"}
    >
      <Stack justifyContent={activeButton && "space-between"}>
        <Stack gap={isMobile ? "12px" : "8px"}>
          <Text type="title" size={isMobile ? "medium" : "large"}>
            {title}
          </Text>
          {descriptionTitle && (
            <Text
              type="title"
              appearance="gray"
              ellipsis
              size={isMobile ? "medium" : "large"}
            >
              {descriptionTitle}
            </Text>
          )}
        </Stack>
        {activeButton && (
          <Stack>
            {isMobile ? (
              <StyledMenuContainer>
                <Icon
                  icon={<MdOutlineMoreVert />}
                  appearance="primary"
                  size="24px"
                  cursorHover
                />
              </StyledMenuContainer>
            ) : (
              <StyledPrint>
                <Button
                  iconBefore={<MdAdd />}
                  spacing="compact"
                  onClick={activeButton.onClick}
                  variant="outlined"
                >
                  {activeButton.title}
                </Button>
                <Button
                  iconBefore={<MdAdd />}
                  spacing="compact"
                  onClick={activeButton.onClickSistemValidation}
                  variant="outlined"
                >
                  {activeButton.titleSistemValidation}
                </Button>
              </StyledPrint>
            )}
          </Stack>
        )}
      </Stack>
      <StyledContainerFieldset
        $aspectRatio={aspectRatio}
        $isMobile={isMobile}
        $hasOverflow={hasOverflow}
        $hasTable={hasTable}
        onClick={handleOnClick}
        $isSelected={selectedState ?? isSelected}
        $height={isMobile ? "auto" : heightFieldset}
        $isClickable={isClickable}
        $hasError={hasError}
        $alignContent={alignContent}
        $borderColor={borderColor}
      >
        {children}
      </StyledContainerFieldset>
    </Stack>
  );
};
