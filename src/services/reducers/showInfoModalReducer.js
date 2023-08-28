import {CLOSE_MODAL, OPEN_MODAL} from "../actions/showInfoModalAction";


const defaultState = {
    modalData: null,
    modalVisible: false,
}

export function showInfoModalReducer(state = defaultState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalData: action.payload,
                modalVisible: true,
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modalData: null,
                modalVisible: false,
            }
        default:
            return state;
    }
}
