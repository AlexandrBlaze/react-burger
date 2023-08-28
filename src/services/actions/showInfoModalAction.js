export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'



export const showInfoModal = (obj) => ({type: OPEN_MODAL, payload: obj})
export const hideInfoModal = () => ({type: CLOSE_MODAL})
