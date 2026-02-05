import { useState, useRef, useEffect } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Stack, Icon, useMediaQuery } from "@inubekit/inubekit";

import { ActionModal } from "../Actions";
import { StyledDetail } from "./styles";

interface DetailProps {
  disableExecute?: boolean;
  disableDiscard?: boolean;
  disableAttach?: boolean;
  disableSeeAttachments?: boolean;
  actionDescriptions?: Record<string, string>;
  onExecute?: () => void;
  onDiscard?: () => void;
  onAttach?: () => void;
  onSeeAttachments?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function Detail(props: DetailProps) {
  const {
    disableExecute,
    disableDiscard,
    disableAttach,
    disableSeeAttachments,
    actionDescriptions,
    onExecute,
    onDiscard,
    onAttach,
    onSeeAttachments,
    onInfoIconClick,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isSmallMobile = useMediaQuery("(max-width: 382px)");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  const handleActionClick = (action: (() => void) | undefined) => {
    if (action) {
      action();
    }
    setModalOpen(false);
  };

  return (
    <StyledDetail $isSmallMobile={isSmallMobile} ref={modalRef}>
      <Stack justifyContent="flex-end">
        <Icon
          icon={<MdOutlineMoreVert />}
          appearance="dark"
          size="24px"
          onClick={() => setModalOpen(!modalOpen)}
          cursorHover
        />

        {modalOpen && (
          <ActionModal
            disableExecute={disableExecute}
            disableDiscard={disableDiscard}
            disableAttach={disableAttach}
            disableSeeAttachments={disableSeeAttachments}
            actionDescriptions={actionDescriptions}
            onExecute={() => handleActionClick(onExecute)}
            onDiscard={() => handleActionClick(onDiscard)}
            onAttach={() => handleActionClick(onAttach)}
            onSeeAttachments={() => handleActionClick(onSeeAttachments)}
            onClose={() => setModalOpen(false)}
            onInfoIconClick={onInfoIconClick}
          />
        )}
      </Stack>
    </StyledDetail>
  );
}
