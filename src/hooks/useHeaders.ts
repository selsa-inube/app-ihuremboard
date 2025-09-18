import { useIAuth } from "@inube/iauth-react";

import { useAppContext } from "@context/AppContext/useAppContext";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useIAuth();
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
