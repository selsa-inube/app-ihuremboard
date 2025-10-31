import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ISpinnerAppearance } from "@inubekit/inubekit";

import { ErrorModal } from "@components/modals/ErrorModal";

import {
  registerErrorModalShow,
  unregisterErrorModalShow,
  ErrorModalOptions,
} from "./errorModalService";

interface InternalOptions {
  title?: string;
  descriptionText: string;
  solutionText: string;
  buttonText?: string;
  appearance?: ISpinnerAppearance;
  onSubmitButtonClick?: () => void;
}

interface ErrorModalContextType {
  showErrorModal: (opts: ErrorModalOptions) => void;
  closeErrorModal: () => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(
  undefined,
);

interface ErrorModalProviderProps {
  children: ReactNode;
}

export const ErrorModalProvider: React.FC<ErrorModalProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<InternalOptions | null>(null);

  const ensurePortalNode = useCallback(() => {
    const id = "portal";
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement("div");
      node.id = id;
      document.body.appendChild(node);
    }
    return node;
  }, []);

  useEffect(() => {
    ensurePortalNode();
  }, [ensurePortalNode]);

  useEffect(() => {
    registerErrorModalShow((opts: ErrorModalOptions) => {
      setOptions({
        title: opts.title,
        descriptionText: opts.descriptionText,
        solutionText: opts.solutionText,
        buttonText: opts.buttonText,
        appearance: opts.appearance!,
        onSubmitButtonClick: opts.onSubmitButtonClick,
      });
      setOpen(true);
    });
    return () => {
      unregisterErrorModalShow();
    };
  }, []);

  const showErrorModal = useCallback((opts: ErrorModalOptions) => {
    setOptions({
      title: opts.title,
      descriptionText: opts.descriptionText,
      solutionText: opts.solutionText,
      buttonText: opts.buttonText,
      appearance: opts.appearance!,
      onSubmitButtonClick: opts.onSubmitButtonClick,
    });
    setOpen(true);
  }, []);

  const closeErrorModal = useCallback(() => {
    setOpen(false);
    setOptions(null);
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showErrorModal, closeErrorModal }}>
      {children}
      {open && options && (
        <ErrorModal
          title={options.title}
          descriptionText={options.descriptionText}
          solutionText={options.solutionText}
          buttonText={options.buttonText}
          appearance={options.appearance}
          onCloseModal={closeErrorModal}
          onSubmitButtonClick={() => {
            closeErrorModal();
          }}
        />
      )}
    </ErrorModalContext.Provider>
  );
};

export function useErrorModal(): ErrorModalContextType {
  const ctx = useContext(ErrorModalContext);
  if (!ctx) {
    throw new Error("useErrorModal must be used within ErrorModalProvider");
  }
  return ctx;
}
