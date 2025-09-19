import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ErrorPageContainer from "@pages/error";
import { ProtectedRoutes } from "@pages/protectedRoutes";

export const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/error" element={<ErrorPageContainer />} />
      <Route path="*" element={<ProtectedRoutes />} />
    </>,
  ),
);
