import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid, Header, useMediaQuery, Icon } from "@inubekit/inubekit";
import { MdOutlineChevronRight } from "react-icons/md";

import { userMenu } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { useValidatePortalAccess } from "@hooks/useValidatePortalAccess";
import { InfoModal } from "@components/modals/InfoModal";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

import { IBusinessUnit } from "./types";

import {
  StyledAppPage,
  StyledContentImg,
  StyledLogo,
  StyledCollapseIcon,
  StyledCollapse,
  StyledMain,
  StyledScrollableContainer,
} from "./styles";

const renderLogo = (imgUrl: string, clientName: string) => {
  return imgUrl ? (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={clientName} />
    </StyledContentImg>
  ) : (
    <StyledContentImg to="/">{clientName}</StyledContentImg>
  );
};

function AppPage() {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    setSelectedClient,
    businessManagers,
  } = useAppContext();

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 944px)");

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
      } else {
        setClientWithoutPrivileges(businessUnit);
        setLocalModalVisible(true);
      }
    } catch (error) {
      console.error("Error al obtener privilegios del portal:", error);
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

  if (loading || validateTrigger) {
    return <LoadingAppUI />;
  }

  return (
    <StyledAppPage>
      {localModalVisible && (
        <InfoModal
          title="Acceso no autorizado"
          titleDescription="No tienes privilegios en esta unidad de negocio"
          description="Por favor, selecciona otra."
          buttonText="Cerrar"
          onCloseModal={() => {
            setLocalModalVisible(false);
            setClientWithoutPrivileges(null);
          }}
        />
      )}

      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
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

        {collapse && (
          <StyledCollapse ref={businessUnitChangeRef}>
            <BusinessUnitChange
              businessUnits={businessUnits}
              selectedClient={selectedClient?.name ?? ""}
              onLogoClick={handleLogoClick}
            />
          </StyledCollapse>
        )}

        <StyledScrollableContainer>
          <StyledMain>
            <Outlet />
          </StyledMain>
        </StyledScrollableContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
