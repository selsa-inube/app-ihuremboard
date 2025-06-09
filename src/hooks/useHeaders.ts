import { useAuth0 } from "@auth0/auth0-react";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const accessToken = await getAccessTokenSilently();
    return {
      "Content-type": "application/json; charset=UTF-8",
      "X-Business-unit": "test",
      Authorization: `Bearer ${accessToken}`,
    };
  };

  return { getHeaders };
};
