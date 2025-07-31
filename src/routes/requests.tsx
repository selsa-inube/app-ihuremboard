import { Route, Routes } from "react-router-dom";

import { Requests } from "@pages/requests";

function RequestsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Requests />} />
    </Routes>
  );
}

export { RequestsRoutes };
