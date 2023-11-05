import request from "../../utils/requestHelper";
import {AppThunk} from "../reducers/rootReducer";
import {IIngredientItem} from "../reducers/ingredientsReducer";
import {CLEAR_USER_DATA, USER_IS_NOT_IDENTIFIED} from "./authActions";

export const ORDER_GET_REQUEST = 'ORDER_GET_REQUEST'
export const ORDER_SUCCESS_REQUEST = 'ORDER_SUCCESS_REQUEST'
export const ORDER_ERROR_REQUEST = 'ORDER_ERROR_REQUEST'
export const ORDER_MODAL_CLOSE = 'ORDER_MODAL_CLOSE'

export const getCreateOrder= (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_GET_REQUEST});
        const orderItems = getState().ingredientsConstructor.items;

        const orderIds = orderItems.map(item => item._id);
        const orderBun = getState().ingredientsConstructor.bun;
        const token = getState().authData.accessToken;

        // булки всегда 2
        if (orderBun) {
            orderIds.push(orderBun._id);
            orderIds.push(orderBun._id);
        }

        if (orderIds.length) {
            const res = await request('orders', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: token,
                },
                body: JSON.stringify({
                    ingredients: orderIds
                })
            })
            const data = await res;
            dispatch({
                type: ORDER_SUCCESS_REQUEST,
                payload: {
                    orderNumber: data.order.number,
                    name: data.name
                },
            })
        } else {
            dispatch({type: ORDER_ERROR_REQUEST});
        }

    } catch (error: any) {
        debugger
        if (error.message === "jwt expired") {
            dispatch({type: CLEAR_USER_DATA})
            dispatch({type: USER_IS_NOT_IDENTIFIED})
        }
        dispatch({type: ORDER_ERROR_REQUEST});
    }
}
