import appHeaderStyles from "./HeaderButton.module.css";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export function HeaderButton({buttonText, children, classes, url = '/'}) {
    return (
        <Link to={url} className={`${appHeaderStyles.link} ${classes}`}>
            {children}
            <span className={appHeaderStyles.text}>{buttonText}</span>
        </Link>
    )
}

HeaderButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    children: PropTypes.element,
    classes: PropTypes.string,
    url: PropTypes.string
}
