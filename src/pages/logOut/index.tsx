import { useEffect } from "react";

import { useIAuth } from "@inube/iauth-react";

export function LogOut() {
  const { logout } = useIAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
}
