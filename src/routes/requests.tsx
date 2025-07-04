import { Route, Routes } from "react-router-dom";

import { Requests } from "@pages/requests";
import { ErrorPage } from "@components/layout/ErrorPage";

function RequestsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Requests />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
}

export { RequestsRoutes };
