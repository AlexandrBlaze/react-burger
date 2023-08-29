import {
    ORDER_ERROR_REQUEST,
    ORDER_GET_REQUEST,
    ORDER_MODAL_CLOSE,
    ORDER_SUCCESS_REQUEST
} from "../actions/createOrderActions";

const defaultState = {
    orderData: {},
    loader: false,
    error: false,
    orderModalVisible: false,
}


export default function createOrderReducer(state = defaultState, action) {
    switch (action.type) {
        case ORDER_GET_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case ORDER_SUCCESS_REQUEST:
            return {
                ...state,
                orderData: action.payload,
                loader: false,
                orderModalVisible: true,
            }
        case ORDER_ERROR_REQUEST:
            return {
                ...state,
                loader: false,
                error: true,
            }
        case ORDER_MODAL_CLOSE:
            return {
                ...state,
                orderData: {},
                orderModalVisible: false,
            }
        default:
            return state;
    }
}
