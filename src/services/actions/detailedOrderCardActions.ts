import {AppThunk} from "../reducers/rootReducer";
import request from "../../utils/requestHelper";

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST';
export const GET_ORDER_BY_ID_SUCCESS = 'GET_ORDER_BY_ID_SUCCESS';
export const GET_ORDER_BY_ID_ERROR = 'GET_ORDER_BY_ID_ERROR';
export const GET_ORDER_BY_ID_RESET = 'GET_ORDER_BY_ID_RESET';



export const getOrderById = (orderNumber: string): AppThunk => async (dispatch) => {
    try {
        dispatch({type: GET_ORDER_BY_ID_REQUEST})
        const res = await request(`orders/${orderNumber}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        dispatch({type: GET_ORDER_BY_ID_SUCCESS, payload: res.orders[0]})
    } catch (err) {
        console.log(err)
        dispatch({type: GET_ORDER_BY_ID_ERROR})
    }
}