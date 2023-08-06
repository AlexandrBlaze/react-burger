import modalOverlayStyles from './ModalOverlay.module.css'
export function ModalOverlay({onClose}) {
    function detectOverlayClick(e) {
        e.nativeEvent.preventDefault()
        onClose();
    }
    return (
        <div onClick={detectOverlayClick} className={modalOverlayStyles.overlay}></div>
    )
}
