import { Stack, Text, useMediaQuery } from "@inubekit/inubekit";

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
  const { title, description } = props;

  const smallScreen = useMediaQuery("(max-width:490px)");

  return (
    <>
      <Stack gap={spacing.s100} direction="column">
        <Stack gap={spacing.s100} alignItems="center">
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
    </>
  );
}
