import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Stack, Icon, useMediaQuery } from "@inubekit/inubekit";

import { ActionModal } from "../Actions";
import { StyledDetail } from "./styles";

interface DetailProps {
  disableRequirements?: boolean;
  disableDiscard?: boolean;
  onSeeRequirements?: () => void;
  onDiscardInfo?: () => void;
  onDiscard?: () => void;
}

export function Detail(props: DetailProps) {
  const {
    disableRequirements,
    disableDiscard,
    onDiscardInfo,
    onSeeRequirements,
    onDiscard,
  } = props;
  const isMobile = useMediaQuery("(max-width: 490px)");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <StyledDetail $isMobile={isMobile}>
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
            disableRequirementsAction={disableRequirements}
            disableDiscardAction={disableDiscard}
            onSeeRequirements={onSeeRequirements}
            onDiscardInfo={onDiscardInfo}
            onDiscard={onDiscard}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Stack>
    </StyledDetail>
  );
}
