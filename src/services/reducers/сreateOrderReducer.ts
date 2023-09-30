import {
    ORDER_ERROR_REQUEST,
    ORDER_GET_REQUEST,
    ORDER_MODAL_CLOSE,
    ORDER_SUCCESS_REQUEST
} from "../actions/createOrderActions";

interface IOrderData {
    orderNumber: string,
    number: number,
}
interface ICreateOrderState {
    orderData: any,
    loader: boolean,
    error: boolean,
    orderModalVisible: boolean,
}
type TGetOrder = {
    type: typeof ORDER_GET_REQUEST,
}
type TOrderSuccess = {
    type: typeof ORDER_SUCCESS_REQUEST,
    payload: IOrderData,
}

type TRequestError = {
    type: typeof ORDER_ERROR_REQUEST
}

type TModalClose = {
    type: typeof ORDER_MODAL_CLOSE
}

type TCreateOrder = TGetOrder | TOrderSuccess | TRequestError | TModalClose
const defaultState: ICreateOrderState = {
    orderData: {},
    loader: false,
    error: false,
    orderModalVisible: false,
}

export default function createOrderReducer(state = defaultState, action: TCreateOrder): ICreateOrderState {
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
