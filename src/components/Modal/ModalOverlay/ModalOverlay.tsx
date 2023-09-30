import modalOverlayStyles from './ModalOverlay.module.css'
import React from "react";
export function ModalOverlay({ onClose }: { onClose: () => void }) {
    return <div onClick={onClose} className={modalOverlayStyles.overlay}></div>;
}
