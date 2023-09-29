
import { Navigate, useLocation } from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {ReactElement} from "react";

interface IComponent {
  component: ReactElement;
}
interface IProtected extends IComponent{
  onlyUnAuth?: boolean,
}
const Protected = ({ onlyUnAuth = false, component}: IProtected) => {
  const user = useAppSelector((store) => store.authData.user);
  const isResetPassword = useAppSelector((store) => store.authData.isResetPassword);
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user && !isResetPassword) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: IComponent) => (
  <Protected onlyUnAuth={true} component={component} />
);
