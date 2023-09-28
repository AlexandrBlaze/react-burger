import modalStyles from './Modal.module.css'

import {createPortal} from "react-dom";
import {ModalOverlay} from "./ModalOverlay/ModalOverlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ReactElement, useCallback, useEffect} from "react";
import React from 'react';

interface IProps {
    children: ReactElement,
    modalTitle?: string,
    toggleModal: () => void,
}
export const Modal = ({ children, modalTitle, toggleModal}: IProps) => {
    const modalRoot:HTMLElement | null = document.getElementById("burger-modals");
    const detectKeyDown = useCallback((event: { key: string; }) =>  {
        if (event.key === 'Escape') {
            toggleModal()
        }
    }, [toggleModal])

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown )
        return () => {
            document.removeEventListener('keydown', detectKeyDown)
        }
    }, [detectKeyDown]);
    return modalRoot ?
        createPortal(
            <React.Fragment>
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
            </React.Fragment>
            ,modalRoot)
        : null


}
