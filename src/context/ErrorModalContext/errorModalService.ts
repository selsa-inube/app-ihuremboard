import { IButtonAppearance } from "@inubekit/inubekit";

export interface ErrorModalOptions {
  title?: string;
  descriptionText: string;
  solutionText: string;
  buttonText?: string;
  appearance?: IButtonAppearance;
  onSubmitButtonClick?: () => void;
}

let _show: ((opts: ErrorModalOptions) => void) | null = null;

export function registerErrorModalShow(
  fn: (opts: ErrorModalOptions) => void,
): void {
  _show = fn;
}

export function unregisterErrorModalShow(): void {
  _show = null;
}

export function showErrorModalFromService(opts: ErrorModalOptions): void {
  if (!_show) {
    console.warn("ErrorModal provider not registered");
    return;
  }
  _show(opts);
}
