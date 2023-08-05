import appHeaderStyles from "./HeaderButton.module.css";
import PropTypes from "prop-types";

export function HeaderButton({buttonText, children, classes}) {
    return (
        <button className={`${appHeaderStyles.button} ${classes}`}>
            {children}
            <span className={appHeaderStyles.text}>{buttonText}</span>
        </button>
    )
}

HeaderButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    children: PropTypes.element,
    classes: PropTypes.string
}
