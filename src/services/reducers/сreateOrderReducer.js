import {ORDER_ERROR_REQUEST, ORDER_GET_REQUEST, ORDER_SUCCESS_REQUEST} from "../actions/createOrderActions";

const defaultState = {
    orderData: {},
    loader: false,
    error: false,
}


export default function createOrderReducer(state = defaultState, action) {
    switch (action.type) {
        case ORDER_GET_REQUEST:
            return {
                ...state,
                loader: true,
                orderData: {},
            }
        case ORDER_SUCCESS_REQUEST:
            return {
                ...state,
                orderData: action.payload,
                loader: false,
            }
        case ORDER_ERROR_REQUEST:
            return {
                ...state,
                loader: false,
                error: true,
            }
        default:
            return state;
    }
}
