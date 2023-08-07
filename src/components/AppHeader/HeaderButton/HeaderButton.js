import appHeaderStyles from "./HeaderButton.module.css";
import PropTypes from "prop-types";

export function HeaderButton({buttonText, children, classes}) {
    return (
        <a href="#" className={`${appHeaderStyles.link} ${classes}`}>
            {children}
            <span className={appHeaderStyles.text}>{buttonText}</span>
        </a>
    )
}

HeaderButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    children: PropTypes.element,
    classes: PropTypes.string
}
