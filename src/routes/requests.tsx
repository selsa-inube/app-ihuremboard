// src/routes/requests/index.tsx
import { Route, Outlet } from "react-router-dom";
import { Requests } from "@pages/requests";
import { ApprovalsRoutes } from "./vacation";

const RequestsRoutes = (
  <Route path="/" element={<Outlet />}>
    <Route index element={<Requests />} />
    <Route path="holiday-request" element={<Outlet />}>
      {ApprovalsRoutes}
    </Route>
  </Route>
);

export { RequestsRoutes };
