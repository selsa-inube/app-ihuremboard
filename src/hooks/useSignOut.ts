import { useAuth0 } from "@auth0/auth0-react";
import { environment } from "@config/environment";

export const useSignOut = () => {
  const { logout } = useAuth0();

  const signOut = (redirect?: string) => {
    localStorage.clear();
    if (!redirect) {
      logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
    } else {
      logout({ logoutParams: { returnTo: window.location.origin + redirect } });
    }
    return null;
  };

  return { signOut };
};
