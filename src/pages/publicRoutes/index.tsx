import { RouterProvider } from "react-router-dom";

import { publicRouter } from "@routes/publicRouter";
import { GlobalStyles } from "@styles/global";

export function PublicRoutes() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={publicRouter} />
    </>
  );
}
