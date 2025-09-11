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
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
  StyledCollapseIcon,
  StyledCollapse,
} from "./styles";
import { useHome } from "./interface";
import { useOptionsMenu } from "@hooks/useOptionsMenu";

const renderLogo = (imgUrl: string, altText: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={altText} />
    </StyledContentImg>
  );
};

function Home() {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    optionForCustomerPortal,
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
  } = useHome();

  const { hasError, isFetching } = useOptionsMenu(
    selectedClient?.id ?? "",
    businessUnits[0]?.businessUnitPublicCode ?? "",
  );

  const configHeader = useConfigHeader(optionForCustomerPortal ?? []);
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
          title="Acceso no autorizado"
          titleDescription="No tienes privilegios en esta unidad de negocio"
          description="Por favor, selecciona otra."
          buttonText="Cerrar"
          onCloseModal={() => setLocalModalVisible(false)}
        />
      )}

      <Grid templateRows="auto auto" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? "Sin unidad seleccionada",
          )}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: selectedClient?.name ?? "Sin unidad seleccionada",
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
                Bienvenido(a), {user?.username ?? "Usuario"}
              </Text>
              <Text
                type="title"
                appearance="gray"
                size={isTablet ? "medium" : "large"}
              >
                Aquí tienes las funcionalidades disponibles.
              </Text>
              <StyledQuickAccessContainer $isTablet={isTablet}>
                {navConfig(optionForCustomerPortal).map((link, index) => (
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
