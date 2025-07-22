import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ErrorPageContainer from "@pages/error";
import { ProtectedRoutes } from "@src/pages/protectedRoutes";

export const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Aquí puedes agregar tus rutas públicas */}
      <Route path="/public-page" element={<div>Página Pública</div>} />
      <Route path="/error" element={<ErrorPageContainer />} />
      <Route path="/help" element={<div>Página de Ayuda</div>} />
      <Route path="/terms" element={<div>Términos y Condiciones</div>} />
      <Route path="*" element={<ProtectedRoutes />} />
    </>,
  ),
);
