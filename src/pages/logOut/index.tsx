import { useIAuth } from "@inube/iauth-react";

import { environment } from "@config/environment";

export function LogOut() {
  localStorage.clear();
  const { logout } = useIAuth();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return null;
}
