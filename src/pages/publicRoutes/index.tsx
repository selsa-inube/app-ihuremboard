import { publicRouter } from "@src/routes/publicRouter";
import { GlobalStyles } from "@styles/global";
import { RouterProvider } from "react-router-dom";

export function PublicRoutes() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={publicRouter} />
    </>
  );
}
