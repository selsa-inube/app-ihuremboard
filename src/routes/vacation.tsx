import { Route } from "react-router-dom";
import { ErrorPage } from "@components/layout/ErrorPage";
import { RequestVacation } from "@src/pages/requestVacation";

const ApprovalsRoutes = (
  <>
    <Route index element={<RequestVacation />} />
    <Route path=":id" element={<RequestVacation />} />
    <Route path="*" element={<ErrorPage />} />
  </>
);

export { ApprovalsRoutes };
