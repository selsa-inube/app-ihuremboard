import { Outlet } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import {
  Text,
  Icon,
  Stack,
  Grid,
  Header,
  useMediaQuery,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { userMenu, useConfigHeader, navConfig } from "@config/nav.config";
import { InfoModal } from "@components/modals/InfoModal";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { ErrorPage } from "@components/layout/ErrorPage";

import {
  StyledAppPage,
  StyledContainer,
  StyledMain,
  StyledQuickAccessContainer,
  StyledCollapseIcon,
  StyledCollapse,
  StyledContentImg,
  StyledLogo,
} from "./styles";
import { useHome } from "./interface";
import { useOptionsMenu } from "@hooks/useOptionsMenu";

const renderLogo = (imgUrl: string, altText: string) => (
  <StyledContentImg to="/">
    <StyledLogo src={imgUrl} alt={altText} />
  </StyledContentImg>
);

function Home() {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    collapse,
    collapseMenuRef,
    businessUnitChangeRef,
    localModalVisible,
    setLocalModalVisible,
    validateTrigger,
    loading,
    showBusinessUnitSelector,
    setCollapse,
    handleLogoClick,
    staffPortalPublicCode,
  } = useHome();

  const { optionData, hasError, isFetching } = useOptionsMenu(
    staffPortalPublicCode,
    selectedClient?.id ?? "",
  );

  const configHeader = useConfigHeader(optionData ?? []);
  const isTablet = useMediaQuery("(max-width: 944px)");

  if (loading || validateTrigger || isFetching) {
    return <LoadingAppUI />;
  }

  if (hasError) {
    return <ErrorPage errorCode={hasError} />;
  }

  return (
    <StyledAppPage>
      {localModalVisible && (
        <InfoModal
          title={labels.home.modals.unauthorizedAccessTitle}
          titleDescription={labels.home.modals.unauthorizedAccessDescription}
          description={labels.home.modals.unauthorizedAccessInstruction}
          buttonText={labels.home.modals.closeButton}
          onCloseModal={() => setLocalModalVisible(false)}
        />
      )}

      <Grid templateRows="auto auto" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? labels.home.header.noUnitSelected,
          )}
          user={{
            username: user?.username ?? labels.home.header.defaultUsername,
            client: selectedClient?.name ?? labels.home.header.noUnitSelected,
            breakpoint: "800px",
          }}
          menu={userMenu}
        />

        {showBusinessUnitSelector && (
          <StyledCollapseIcon
            $collapse={collapse}
            ref={collapseMenuRef}
            $isTablet={isTablet}
            onClick={() => setCollapse(!collapse)}
          >
            <Icon
              icon={<MdOutlineChevronRight />}
              appearance="primary"
              size="24px"
              cursorHover
            />
          </StyledCollapseIcon>
        )}

        {collapse && showBusinessUnitSelector && (
          <StyledCollapse ref={businessUnitChangeRef}>
            <BusinessUnitChange
              businessUnits={businessUnits}
              selectedClient={selectedClient?.name ?? ""}
              onLogoClick={handleLogoClick}
            />
          </StyledCollapse>
        )}

        <StyledContainer>
          <StyledMain $isTablet={isTablet}>
            <Stack gap={spacing.s300} direction="column">
              <Text size={isTablet ? "medium" : "large"} type="headline">
                {labels.home.main.welcome}, {user?.username ?? "Usuario"}
              </Text>
              <Text
                type="title"
                appearance="gray"
                size={isTablet ? "medium" : "large"}
              >
                {labels.home.main.subtitle}
              </Text>
              <StyledQuickAccessContainer $isTablet={isTablet}>
                {navConfig(optionData).map((link, index) => (
                  <AppCard
                    key={index}
                    title={link.label}
                    description={link.description}
                    icon={link.icon}
                    url={link.path}
                  />
                ))}
              </StyledQuickAccessContainer>
            </Stack>
            <Outlet />
          </StyledMain>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { Home };
