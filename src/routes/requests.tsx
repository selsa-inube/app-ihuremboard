import { Route, Routes } from "react-router-dom";

import { Requests } from "@pages/requests";
import { ApplicationProcess } from "@pages/requests/ApplicationProcess/applicationProcess";
import { ExtendedLinkingRequest } from "@pages/requests/ExtendedLinkingRequest";
import { ErrorPage } from "@components/layout/ErrorPage";

function RequestsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Requests />} />
      <Route path="/:id" element={<ApplicationProcess />} />
      <Route path="/linking-request/:id" element={<ExtendedLinkingRequest />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
}

export { RequestsRoutes };
