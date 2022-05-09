import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function PrivateRouter() {
  const { isLogged } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLogged) {
    
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default PrivateRouter;
