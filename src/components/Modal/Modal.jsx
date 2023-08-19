import modalStyles from './Modal.module.css'

import {createPortal} from "react-dom";
import {ModalOverlay} from "./ModalOverlay/ModalOverlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect} from "react";
import PropTypes from "prop-types";


const modalRoot = document.getElementById("burger-modals");
Modal.propTypes = {
    children: PropTypes.element,
    modalTitle: PropTypes.string,
    toggleModal: PropTypes.func,
}
export function Modal({ children, modalTitle, toggleModal}){

    const detectKeyDown = useCallback(event =>  {
        if (event.key === 'Escape') {
            toggleModal();
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown )
        return () => {
            document.removeEventListener('keydown', detectKeyDown)
        }
    }, [detectKeyDown]);

    return(
        createPortal(
            <>
                <div className={modalStyles.modal}>
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

                <ModalOverlay onClose={toggleModal}/>
            </>
        , modalRoot)
    );
}
