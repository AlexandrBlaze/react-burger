import { Navigate, useLocation } from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {ReactElement} from "react";

export const ProtectedResetRoute = ({ component }: {component: ReactElement}) => {
  const isResetPassword = useAppSelector((store) => store.authData.isResetPassword);
  const location = useLocation();

  if (!isResetPassword) {
    return <Navigate to="/login" state={{ from: location }}/>
  }
  

  return component;
};

