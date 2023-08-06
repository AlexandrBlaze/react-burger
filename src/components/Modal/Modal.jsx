import modalStyles from './Modal.module.css'

import {createPortal} from "react-dom";
import {ModalOverlay} from "./ModalOverlay/ModalOverlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef} from "react";
import {useOnClickOutside} from "usehooks-ts";
import PropTypes from "prop-types";


const modalRoot = document.getElementById("burger-modals");
Modal.propTypes = {
    children: PropTypes.element,
    modalTitle: PropTypes.string,
    toggleModal: PropTypes.func,
}
export function Modal({children, modalTitle, toggleModal}){
    const modalRef = useRef(null)

    useEffect(() => {
        modalRef.current.focus();
    }, []);

    const detectKeyDown = (e) => {
        console.log(e.key)
        if (e.key === 'Escape') {
            toggleModal();
        }
    }
    const handleClickModalOutside = () => toggleModal();

    useOnClickOutside(modalRef, handleClickModalOutside)

    return(
        createPortal(
            <ModalOverlay>
                <div ref={modalRef}
                     tabIndex={0}
                     onKeyDown={detectKeyDown}
                     className={modalStyles.modal}>
                    <div className={modalStyles.header}>
                        {modalTitle && <span className="text text_type_main-large">{modalTitle}</span>}
                        <button onClick={toggleModal}
                                className={modalStyles.closeButton}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    <div className={modalStyles.content}>
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        , modalRoot)
    );
}
