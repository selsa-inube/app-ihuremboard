import { useEffect } from "react";
import { useNavigate, UNSAFE_NavigationContext } from "react-router-dom";
import { LoadingAppUI } from "./interface";
import { useContext } from "react";

function LoadingApp() {
  const routerContext = useContext(UNSAFE_NavigationContext);
  const navigate = routerContext ? useNavigate() : null;

  useEffect(() => {
    if (navigate) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return <LoadingAppUI />;
}

export { LoadingApp };
