import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { LoginRoutes } from "@routes/login";
import { ProtectedAppPage } from "src/ProtectedAppPage";
import { RequestsRoutes } from "@routes/requests";
import { FirstPage } from "@src/pages/firstPage";
import { LogOut } from "@src/pages/logOut";

export const protectedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={<FirstPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="/login/*" element={<LoginRoutes />} />
      <Route
        path="/"
        element={<ProtectedAppPage />}
        errorElement={<ErrorPage errorCode={404} />}
      >
        {RequestsRoutes}
      </Route>
      <Route path="/logout" element={<LogOut />} />
    </>,
  ),
);
