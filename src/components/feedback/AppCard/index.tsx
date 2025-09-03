import { MdOutlineInfo } from "react-icons/md";
import { Stack, Text, Icon, Divider } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

import {
  StyledAppCard,
  StyledComplementContainer,
  StyledDescription,
} from "./styles";

interface AppCardProps {
  title: string;
  complement?: string[];
  description: string;
  icon: React.ReactNode;
  url: string;
  showComplement?: boolean;
}

function AppCard(props: AppCardProps) {
  const { title, complement, description, icon, url, showComplement } = props;

  return (
    <StyledAppCard to={url}>
      <Stack justifyContent="space-between">
        <Text type="title" size="medium" weight="bold">
          {title}
        </Text>
        <Icon icon={icon} appearance="dark" size="22px" cursorHover />
      </Stack>

      <Stack padding={`${spacing.s150} ${spacing.s0}`}>
        <Divider dashed />
      </Stack>

      <Stack direction="column" gap={spacing.s200}>
        <StyledDescription>
          <Text size="small">{description}</Text>
        </StyledDescription>

        {showComplement && complement && complement.length > 0 && (
          <StyledComplementContainer>
            {complement.map((text, index) => (
              <Stack key={index} alignItems="center" gap={spacing.s075}>
                <Icon
                  icon={<MdOutlineInfo />}
                  appearance="primary"
                  size="12px"
                />
                <Text type="label" size="small">
                  {text}
                </Text>
              </Stack>
            ))}
          </StyledComplementContainer>
        )}
      </Stack>
    </StyledAppCard>
  );
}

export { AppCard };
export type { AppCardProps };
