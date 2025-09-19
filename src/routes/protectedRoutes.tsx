import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { LoginRoutes } from "@routes/login";
import { RequestsRoutes } from "@routes/requests";
import { FirstPage } from "@pages/firstPage";
import { LogOut } from "@pages/logOut";
import { Home } from "@pages/home";

import { ProtectedAppPage } from "src/ProtectedAppPage";

export const protectedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={<FirstPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<LoginRoutes />} />

      <Route path="/*" element={<ProtectedAppPage />}>
        <Route path="requests/*" element={<RequestsRoutes />} />
      </Route>

      <Route path="/logout" element={<LogOut />} />
    </>,
  ),
);
