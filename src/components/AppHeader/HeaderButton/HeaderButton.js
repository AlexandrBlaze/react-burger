import appHeaderStyles from "./HeaderButton.module.css";
import PropTypes from "prop-types";
import {Link, NavLink} from "react-router-dom";

export function HeaderButton({buttonText, children, classes, url = '/'}) {

    return (
        <NavLink  to={{ pathname: url }}
                  className={({ isActive }) => `${appHeaderStyles.link} ${isActive ? appHeaderStyles.activeLink : ''}`}>
            {children}
            <span className={appHeaderStyles.text}>{buttonText}</span>
        </NavLink>
    )
}

HeaderButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    children: PropTypes.element,
    classes: PropTypes.string,
    url: PropTypes.string
}
