import { PublicRoutes } from "@pages/publicRoutes";
import { ProtectedRoutes } from "@pages/protectedRoutes";
import { publicPaths } from "@config/publicPaths";

import { AuthWrapper } from "./pages/AuthWrapper";

function App() {
  const currentPath = window.location.pathname;
  const isPublicRoute = publicPaths.some((path) =>
    currentPath.startsWith(path),
  );

  if (isPublicRoute) {
    return <PublicRoutes />;
  }

  return (
    <AuthWrapper>
      <ProtectedRoutes />
    </AuthWrapper>
  );
}

export default App;
