import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Stack, Text, Icon, useMediaQuery } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { SelectionModal } from "@components/modals/SelectionModal";
import { spacing } from "@design/tokens/spacing";

export interface PageTitleProps {
  title: string;
  description?: string;
  navigatePage?: string;
  showBackModal?: boolean;
  modalTitle?: string;
  modalDescription?: string;
  modalConfirmText?: string;
  modalCancelText?: string;
}

export function PageTitle(props: PageTitleProps) {
  const {
    title,
    description,
    navigatePage,
    showBackModal = false,
    modalTitle = labels.layout.modals.backModal.title,
    modalDescription = labels.layout.modals.backModal.description,
    modalConfirmText = labels.layout.modals.backModal.confirm,
    modalCancelText = labels.layout.modals.backModal.cancel,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleBackClick() {
    if (showBackModal) {
      setIsModalOpen(true);
    } else {
      if (navigatePage) {
        navigate(navigatePage);
      } else {
        navigate(-1);
      }
    }
  }

  function handleModalConfirm() {
    setIsModalOpen(false);
    if (navigatePage) {
      navigate(navigatePage);
    } else {
      navigate(-1);
    }
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Stack gap={spacing.s100} direction="column">
        <Stack gap={spacing.s100} alignItems="center">
          <Icon
            appearance="dark"
            cursorHover={true}
            icon={<MdArrowBack />}
            size={spacing.s250}
            onClick={handleBackClick}
          />
          <Text as="h1" type="title" size={smallScreen ? "medium" : "large"}>
            {title}
          </Text>
        </Stack>

        {description && (
          <Text appearance="gray" size={smallScreen ? "small" : "medium"}>
            {description}
          </Text>
        )}
      </Stack>
      {showBackModal && isModalOpen && (
        <SelectionModal
          title={modalTitle}
          descriptionText={modalDescription}
          buttonText={modalConfirmText}
          secondaryButtonText={modalCancelText}
          onCloseModal={handleModalClose}
          onSecondaryButtonClick={handleModalClose}
          onSubmitButtonClick={handleModalConfirm}
        />
      )}
    </>
  );
}
