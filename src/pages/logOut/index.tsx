import { useAuth0 } from "@auth0/auth0-react";

import { environment } from "@config/environment";

export function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}
