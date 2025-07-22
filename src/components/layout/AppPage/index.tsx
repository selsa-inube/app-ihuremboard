import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid, Header, useMediaQuery, Icon } from "@inubekit/inubekit";
import { MdOutlineChevronRight } from "react-icons/md";

import { userMenu } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { useValidatePortalAccess } from "@hooks/useValidatePortalAccess";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

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
  const { user, logoUrl, selectedClient, businessUnits, setSelectedClient } =
    useAppContext();

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 944px)");

  const [validateTrigger, setValidateTrigger] = useState(!!selectedClient);

  const { loading } = useValidatePortalAccess(validateTrigger);

  const handleLogoClick = (businessUnit: IBusinessUnit) => {
    setSelectedClient({
      id: businessUnit.businessUnitPublicCode,
      name: businessUnit.businessUnitPublicCode,
      sigla: businessUnit.abbreviatedName,
      logo: businessUnit.urlLogo,
    });

    setValidateTrigger(true);
    setCollapse(false);
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
