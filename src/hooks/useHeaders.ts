import { useCallback } from "react";
import { useIAuth } from "@inube/iauth-react";
import { useAppContext } from "@context/AppContext/useAppContext";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useIAuth();
  const { selectedClient } = useAppContext();

  const getHeaders = useCallback(
    async (withAuth = true) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Business-Unit": selectedClient?.id ?? "",
        Authorization: "",
      };

      if (withAuth) {
        try {
          const accessToken = await getAccessTokenSilently();
          headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          console.error("Error getting access token:", error);
          headers.Authorization = "";
        }
      } else {
        headers.Authorization = "";
      }

      return headers;
    },
    [getAccessTokenSilently, selectedClient?.id],
  );

  return { getHeaders };
};
