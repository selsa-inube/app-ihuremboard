import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav, Grid, Header, useMediaQuery, Icon } from "@inubekit/inubekit";
import { MdOutlineChevronRight } from "react-icons/md";

import {
  useNavConfig,
  userMenu,
  actions,
  useConfigHeader,
} from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { useValidatePortalAccess } from "@hooks/useValidatePortalAccess";
import { InfoModal } from "@components/modals/InfoModal";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { ErrorPage } from "@components/layout/ErrorPage";
import { Logger } from "@utils/logger";
import { labels } from "@i18n/labels";

import { IBusinessUnit } from "./types";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledCollapseIcon,
  StyledCollapse,
  StyledMainScroll,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
  fullWidth?: boolean;
}

const renderLogo = (imgUrl: string, clientName: string) => {
  return imgUrl ? (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={clientName} />
    </StyledContentImg>
  ) : (
    <StyledContentImg to="/">{clientName}</StyledContentImg>
  );
};

function AppPage(props: AppPageProps) {
  const { withNav = true, fullWidth = false } = props;

  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    setSelectedClient,
    businessManagers,
    optionForCustomerPortal,
  } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 944px)");
  const navigate = useNavigate();

  const navConfig = useNavConfig(optionForCustomerPortal ?? []);
  const configHeader = useConfigHeader(optionForCustomerPortal ?? []);

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const [validateTrigger, setValidateTrigger] = useState(!!selectedClient);
  const { loading } = useValidatePortalAccess(validateTrigger);

  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [, setClientWithoutPrivileges] = useState<IBusinessUnit | null>(null);

  const handleLogoClick = async (businessUnit: IBusinessUnit) => {
    try {
      const useCases = await getUseCasesByStaff(
        user?.id ?? "",
        businessManagers?.publicCode ?? "",
        businessUnit.businessUnitPublicCode,
      );

      const roles = useCases.listOfUseCasesByRoles ?? [];
      const hasAccess = roles.includes("PortalBoardAccess");

      if (hasAccess) {
        setSelectedClient({
          id: businessUnit.businessUnitPublicCode,
          name: businessUnit.businessUnitPublicCode,
          sigla: businessUnit.abbreviatedName,
          logo: businessUnit.urlLogo,
        });

        setValidateTrigger(true);
        setCollapse(false);
        navigate("/");
      } else {
        setClientWithoutPrivileges(businessUnit);
        setLocalModalVisible(true);
      }
    } catch (error: unknown) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Unknown error while getting portal privileges");

      Logger.error("Error al obtener privilegios del portal", normalizedError, {
        module: "PortalPrivileges",
        action: "getPrivileges",
      });

      setClientWithoutPrivileges(businessUnit);
      setLocalModalVisible(true);
    }
  };

  useEffect(() => {
    if (validateTrigger) {
      const timeout = setTimeout(() => setValidateTrigger(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [validateTrigger]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      collapseMenuRef.current &&
      !collapseMenuRef.current.contains(event.target as Node) &&
      businessUnitChangeRef.current &&
      !businessUnitChangeRef.current.contains(event.target as Node)
    ) {
      setCollapse(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading || validateTrigger) {
    return <LoadingAppUI />;
  }

  const isMenuEmpty =
    !navConfig?.sections ||
    Object.values(navConfig.sections).every(
      (section) => !section.links || Object.keys(section.links).length === 0,
    );

  if (isMenuEmpty) {
    return <ErrorPage errorCode={1005} />;
  }

  const showBusinessUnitSelector = businessUnits.length > 1;

  return (
    <StyledAppPage>
      {localModalVisible && (
        <InfoModal
          title={labels.layout.modals.unauthorizedAccess.title}
          titleDescription={labels.layout.modals.unauthorizedAccess.description}
          description={labels.layout.modals.unauthorizedAccess.helperText}
          buttonText={labels.layout.modals.unauthorizedAccess.button}
          onCloseModal={() => {
            setLocalModalVisible(false);
            setClientWithoutPrivileges(null);
          }}
        />
      )}

      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
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
          <Grid
            templateColumns={withNav && !isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height="95vh"
          >
            {withNav && !isTablet && (
              <Nav navigation={navConfig} actions={actions} collapse={true} />
            )}
            <StyledMainScroll>
              <StyledMain $fullWidth={fullWidth}>
                <Outlet />
              </StyledMain>
            </StyledMainScroll>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
