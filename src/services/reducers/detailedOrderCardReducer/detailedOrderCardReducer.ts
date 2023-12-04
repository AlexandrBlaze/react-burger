import {
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_RESET,
    GET_ORDER_BY_ID_SUCCESS
} from "../../actions/detailedOrderCardActions";

import {IFeedItem} from "../feedReducer/feedReducer";
interface IOrderItem {
    _id?: string;
    ingredients?: Array<string>;
    status?: 'done' | 'pending' | 'created';
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    number?: number;
}
interface IDetailedOrderCardState {
    order: IOrderItem;
    loader: boolean;
    error: boolean;
}

type TGetOrderByIdRequest = {
    type: typeof GET_ORDER_BY_ID_REQUEST
}
type TGetOrderByIdSuccess = {
    type: typeof GET_ORDER_BY_ID_SUCCESS
    payload: IFeedItem
}
type TGetOrderByIdError = {
    type: typeof GET_ORDER_BY_ID_ERROR
}

type TGetOrderByIdReset = {
    type: typeof GET_ORDER_BY_ID_RESET
}

const defaultState: IDetailedOrderCardState = {
    order: {},
    loader: false,
    error: false,
}

type TDetailedOrderCardReducerActions = TGetOrderByIdRequest | TGetOrderByIdSuccess | TGetOrderByIdError | TGetOrderByIdReset

export default function detailedOrderCardReducer(state = defaultState, action: TDetailedOrderCardReducerActions): IDetailedOrderCardState {
    switch (action.type) {
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case GET_ORDER_BY_ID_SUCCESS:
            return  {
                ...state,
                order: action.payload,
                loader: false
            }
        case GET_ORDER_BY_ID_RESET:
            return {
                ...state,
                order: {},
            }
        case GET_ORDER_BY_ID_ERROR:
            return  {
                ...state,
                loader: false
            }
        default:
            return state;
    }
}
