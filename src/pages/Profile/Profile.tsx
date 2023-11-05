import profileStyles from './Profile.module.css'
import {logout} from "../../services/actions/authActions";

import {useAppDispatch} from "../../hooks";
import {NavLink, Outlet} from "react-router-dom";

export default function Profile() {
    const dispatch = useAppDispatch();
    const onLogout = (): void => {
        dispatch(logout());
    }

    return (
        <main className={profileStyles.wrapper}>
            <div className={profileStyles.inner}>
                <div className={profileStyles.sidebar}>
                    <nav className={profileStyles.nav}>
                        <li>
                            <NavLink  to=""
                                      relative="route"
                                      className={({ isActive }) => `${profileStyles.link} ${isActive ? profileStyles.active : ''}`}
                                      end>
                                Профиль
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  to="orders"
                                      relative="route"
                                      className={({ isActive }) => `${profileStyles.link} ${isActive ? profileStyles.active : ''}`}
                                      end>
                                История заказов
                            </NavLink>
                        </li>
                        <li className='text text_type_main-medium text_color_inactive' onClick={() => onLogout()}>Выход</li>
                    </nav>
                    <div className={profileStyles.infoMessage}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </div>
                </div>
                <div className={profileStyles.content}>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}