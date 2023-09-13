import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedResetRoute = ({ canSee = false, component }) => {
  const user = useSelector((store) => store.authData.user);
  const isResetPassword = useSelector((store) => store.authData.isResetPassword);
  const location = useLocation();

  if (!isResetPassword) {
    return <Navigate to="/login" state={{ from: location }}/>
  }
  

  return component;
};

