import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext } from "@context/AppContext/useAppContext";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { selectedClient } = useAppContext();

  const getHeaders = async () => {
    const accessToken = await getAccessTokenSilently();
    return {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
      "X-Business-Unit": selectedClient?.id ?? "",
    };
  };

  return { getHeaders };
};
