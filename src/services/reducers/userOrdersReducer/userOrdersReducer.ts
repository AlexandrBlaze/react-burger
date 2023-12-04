import {

} from "../../middleware/socketMiddleware";

import {
    ORDER_WS_CONNECTION_CLOSED,
    ORDER_WS_CONNECTION_ERROR,
    ORDER_WS_CONNECTION_SUCCESS, ORDER_WS_GET_MESSAGE
} from "../../actions/orderWsActions";
import {IFeedItem} from "../feedReducer/feedReducer";

interface IDefaultState {
    orders: IFeedItem[];
    total: number;
    totalToday: number;
    isOpen: boolean;
    error: any
}

const defaultState: IDefaultState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isOpen: false,
    error: null,
}
type TWsConnectionSuccess = {
    type: typeof ORDER_WS_CONNECTION_SUCCESS
}
type TWsConnectionError = {
    type: typeof ORDER_WS_CONNECTION_ERROR
    payload: string
}
type TWsConnectionClosed = {
    type: typeof ORDER_WS_CONNECTION_CLOSED
}
type TWsGetMessage = {
    type: typeof ORDER_WS_GET_MESSAGE
    payload: {
        orders: IFeedItem[],
        total: number,
        totalToday: number
    }
}

type TUserOrdersReducer = TWsConnectionSuccess | TWsConnectionError | TWsConnectionClosed | TWsGetMessage;
export default function userOrdersReducer(state = defaultState, action: TUserOrdersReducer): IDefaultState {
    switch (action.type) {
        case ORDER_WS_CONNECTION_SUCCESS:
            return {
                ...state,
                isOpen: true,
                error: null,
            }
        case ORDER_WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case ORDER_WS_CONNECTION_CLOSED: {
            return {
                ...state,
                isOpen: false,
            }
        }
        case ORDER_WS_GET_MESSAGE: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }
        default:
            return state;
    }
}