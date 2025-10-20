import { useState } from "react";
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

  const isSmallMobile = useMediaQuery("(max-width: 382px)");

  return (
    <StyledDetail $isSmallMobile={isSmallMobile}>
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
            onExecute={onExecute}
            onDiscard={onDiscard}
            onAttach={onAttach}
            onSeeAttachments={onSeeAttachments}
            onClose={() => setModalOpen(false)}
            onInfoIconClick={onInfoIconClick}
          />
        )}
      </Stack>
    </StyledDetail>
  );
}
