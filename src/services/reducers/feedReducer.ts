import {

} from "../middleware/socketMiddleware";
import {FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_ERROR, FEED_WS_CONNECTION_SUCCESS, FEED_WS_GET_MESSAGE} from "../actions/feedWsActions";

interface IDefaultState {
    orders: IFeedItem[];
    total: number;
    totalToday: number;
    isOpen: boolean;
    error: any
}


export interface IFeedItem {
    _id: string;
    ingredients: Array<string>;
    status: 'done' | 'pending' | 'created';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

const defaultState: IDefaultState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isOpen: false,
    error: null,
}
type TWsConnectionSuccess = {
    type: typeof FEED_WS_CONNECTION_SUCCESS
}
type TWsConnectionError = {
    type: typeof FEED_WS_CONNECTION_ERROR
    payload: string
}
type TWsConnectionClosed = {
    type: typeof FEED_WS_CONNECTION_CLOSED
}
type TWsGetMessage = {
    type: typeof FEED_WS_GET_MESSAGE
    payload: {
        orders: IFeedItem[],
        total: number,
        totalToday: number
    }
}

type TFeedReducer = TWsConnectionSuccess | TWsConnectionError | TWsConnectionClosed | TWsGetMessage;
export default function feedReducer(state = defaultState, action: TFeedReducer): IDefaultState {
    switch (action.type) {
        case FEED_WS_CONNECTION_SUCCESS:
            return {
                ...state,
                isOpen: true,
                error: null,
            }
        case FEED_WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case FEED_WS_CONNECTION_CLOSED: {
            return {
                ...state,
                isOpen: false,
            }
        }
        case FEED_WS_GET_MESSAGE: {
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