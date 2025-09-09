import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import { useAppContext } from "@context/AppContext";
import { InfoModal } from "@components/modals/InfoModal";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal"; // Asegúrate de importar la función correcta
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

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

interface IBusinessUnitFixed {
  businessUnitPublicCode: string;
  descriptionUse: string;
  abbreviatedName: string;
  urlLogo: string;
}

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
    setSelectedClient,
    optionForCustomerPortal,
    setOptionForCustomerPortal,
    businessManagers,
  } = useAppContext();

  const configHeader = useConfigHeader(optionForCustomerPortal ?? []);
  const isTablet = useMediaQuery("(max-width: 944px)");
  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [, setClientWithoutPrivileges] = useState<IBusinessUnitFixed | null>(
    null,
  );

  const [validateTrigger, setValidateTrigger] = useState(!!selectedClient);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      if (
        user?.id &&
        (!optionForCustomerPortal || optionForCustomerPortal.length === 0)
      ) {
        try {
          setLoading(true);
          const options = await getOptionForCustomerPortal(user.id, "");
          setOptionForCustomerPortal(options);
        } catch (error) {
          console.error("Error obteniendo opciones:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOptions();
  }, [user, optionForCustomerPortal, setOptionForCustomerPortal]);

  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

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

  useEffect(() => {
    if (validateTrigger) {
      const timeout = setTimeout(() => setValidateTrigger(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [validateTrigger]);

  const handleLogoClick = async (businessUnit: IBusinessUnitFixed) => {
    try {
      setLoading(true);

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
          name: businessUnit.descriptionUse,
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
    } catch (error) {
      console.error("Error al obtener privilegios del portal:", error);
      setClientWithoutPrivileges(businessUnit);
      setLocalModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const showBusinessUnitSelector = businessUnits.length > 1;

  if (loading || validateTrigger || !optionForCustomerPortal) {
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
            <Grid
              templateColumns={isTablet ? "1fr" : "auto 1fr"}
              alignItems="start"
            >
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
            </Grid>
            <Outlet />
          </StyledMain>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { Home };
