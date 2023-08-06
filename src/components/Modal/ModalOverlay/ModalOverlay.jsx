import modalOverlayStyles from './ModalOverlay.module.css'
export function ModalOverlay({children}) {
    return (
        <div className={modalOverlayStyles.overlay}>
            {children}
        </div>
    )
}
