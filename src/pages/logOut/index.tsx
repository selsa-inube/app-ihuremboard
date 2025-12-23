import { useEffect } from "react";

import { useSignOut } from "@hooks/useSignOut";

export function LogOut() {
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut("/error?code=1002");
  }, [signOut]);

  return null;
}
