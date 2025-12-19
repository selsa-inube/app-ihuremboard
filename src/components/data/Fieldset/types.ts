export interface IOptionsButton {
  title: string;
  titleSistemValidation: string;
  onClick: () => void;
  onClickSistemValidation: () => void;
  disabled?: boolean;
  disabledSistemValidation?: boolean;
}
