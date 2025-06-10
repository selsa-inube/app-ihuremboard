import { Grid, Header } from "@inubekit/inubekit";

import { userMenu } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";

import { StyledAppPage, StyledContentImg, StyledLogo } from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { user, logoUrl, selectedClient } = useAppContext();

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          logoURL={renderLogo(logoUrl)}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: selectedClient?.name ?? "Sin unidad seleccionada",
            breakpoint: "800px",
          }}
          menu={userMenu}
        />
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
