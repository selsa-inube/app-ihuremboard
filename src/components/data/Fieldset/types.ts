export interface IOptionsButton {
  title: string;
  titleSistemValidation: string;
  onClick?: () => void;
  onClickSistemValidation?: () => void;
}

export interface FieldsetProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
  aspectRatio?: string;
  heightFieldset?: string;
  descriptionTitle?: string;
  activeButton?: IOptionsButton;
  disabledButton?: boolean;
  hasTable?: boolean;
  hasOverflow?: boolean;
  isMobile?: boolean;
  isClickable?: boolean;
  selectedState?: boolean;
  hasError?: boolean;
  alignContent?: string;
  borderColor?: string;
  onSelectionChange?: () => void;
}
