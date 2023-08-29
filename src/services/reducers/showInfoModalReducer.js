import {CLOSE_INFO_MODAL, OPEN_INFO_MODAL} from "../actions/showInfoModalAction";


const defaultState = {
    modalData: null,
    modalInfoVisible: false,
}

export function showInfoModalReducer(state = defaultState, action) {
    switch (action.type) {
        case OPEN_INFO_MODAL:
            return {
                ...state,
                modalData: action.payload,
                modalInfoVisible: true,
            }
        case CLOSE_INFO_MODAL:
            return {
                ...state,
                modalData: null,
                modalInfoVisible: false,
            }
        default:
            return state;
    }
}
