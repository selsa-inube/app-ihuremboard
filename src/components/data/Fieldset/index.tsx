import { useState } from "react";
import { MdAdd, MdOutlineMoreVert } from "react-icons/md";
import { Stack, Text, useMediaQuery, Button, Icon } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import {
  StyledContainerFieldset,
  StyledMenuContainer,
  StyledMenuDropdown,
  StyledPrint,
  StyledMobileMenuItem,
} from "./styles";
import { IOptionsButton } from "./types";

export interface FieldsetProps {
  children: React.ReactNode;
  title: string;
  descriptionTitle?: string;
  aspectRatio?: string;
  heightFieldset?: string;
  activeButton?: IOptionsButton;
  hasTable?: boolean;
  hasOverflow?: boolean;
  isClickable?: boolean;
  selectedState?: boolean;
  hasError?: boolean;
  borderColor?: "normal" | "error" | "success";
  alignContent?: "left" | "center" | "right";
  onSelectionChange?: () => void;
}

export function Fieldset(props: FieldsetProps) {
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

  const isMobile = useMediaQuery("(max-width:1396px)");
  const [isSelected, setIsSelected] = useState(selectedState || false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOnClick = () => {
    if (isClickable) {
      setIsSelected(!isSelected);
      onSelectionChange?.();
    }
  };

  return (
    <Stack
      direction="column"
      gap={spacing.s100}
      width="-webkit-fill-available"
      height={!isMobile ? heightFieldset : "auto"}
    >
      <Stack justifyContent={activeButton ? "space-between" : undefined}>
        <Stack gap={isMobile ? spacing.s150 : spacing.s100}>
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
                  appearance="dark"
                  size="24px"
                  cursorHover
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                />

                {mobileMenuOpen && (
                  <StyledMenuDropdown>
                    <StyledMobileMenuItem
                      $disabled={activeButton.disabled}
                      onClick={() => {
                        if (activeButton.disabled) return;
                        activeButton.onClick();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Text
                        size="small"
                        appearance={activeButton.disabled ? "gray" : "dark"}
                      >
                        {activeButton.title}
                      </Text>
                    </StyledMobileMenuItem>

                    <StyledMobileMenuItem
                      $disabled={activeButton.disabledSistemValidation}
                      onClick={() => {
                        if (activeButton.disabledSistemValidation) return;
                        activeButton.onClickSistemValidation();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Text
                        size="small"
                        appearance={
                          activeButton.disabledSistemValidation
                            ? "gray"
                            : "dark"
                        }
                      >
                        {activeButton.titleSistemValidation}
                      </Text>
                    </StyledMobileMenuItem>
                  </StyledMenuDropdown>
                )}
              </StyledMenuContainer>
            ) : (
              <StyledPrint>
                <Button
                  iconBefore={<MdAdd />}
                  spacing="compact"
                  variant="outlined"
                  onClick={activeButton.onClick}
                  disabled={activeButton.disabled}
                >
                  {activeButton.title}
                </Button>

                <Button
                  iconBefore={<MdAdd />}
                  spacing="compact"
                  variant="outlined"
                  onClick={activeButton.onClickSistemValidation}
                  disabled={activeButton.disabledSistemValidation}
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
}
