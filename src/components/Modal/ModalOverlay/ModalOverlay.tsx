import modalOverlayStyles from './ModalOverlay.module.css'
export function ModalOverlay({onClose}: {onClose: () => void}) {
    function detectOverlayClick(e: { nativeEvent: { preventDefault: () => void; }; }) {
        e.nativeEvent.preventDefault()
        onClose();
    }
    return (
        <div onClick={detectOverlayClick} className={modalOverlayStyles.overlay}></div>
    )
}
