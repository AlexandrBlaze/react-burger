import appHeaderStyles from "./HeaderButton.module.css";

import {NavLink} from "react-router-dom";
import {ReactElement} from "react";
interface IProps {
    children: ReactElement,
    buttonText?: string,
    classes?: string,
    url: string,
}
export function HeaderButton({buttonText, children, classes, url = '/'}: IProps) {

    return (
        <NavLink  to={{ pathname: url }}
                  className={({ isActive }) => `${appHeaderStyles.link} ${isActive ? appHeaderStyles.activeLink : ''}`}>
            {children}
            <span className={appHeaderStyles.text}>{buttonText}</span>
        </NavLink>
    )
}