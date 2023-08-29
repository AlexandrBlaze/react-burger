import request from "../../utils/requestHelper";
import checkResponse from "../../utils/checkResponse";

export const ORDER_GET_REQUEST = 'ORDER_GET_REQUEST'
export const ORDER_SUCCESS_REQUEST = 'ORDER_SUCCESS_REQUEST'
export const ORDER_ERROR_REQUEST = 'ORDER_ERROR_REQUEST'
export const ORDER_MODAL_CLOSE = 'ORDER_MODAL_CLOSE'


export const getCreateOrder= () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_GET_REQUEST});
        const orderIds = getState().ingredients.ingredientItems.map(item => item._id);

        const res = await request('orders', {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8',},
            body: JSON.stringify({
                ingredients: orderIds
            })
        })
        const data = await res;
        dispatch({
            type: ORDER_SUCCESS_REQUEST,
            payload: {orderNumber: data.order.number, name: data.name},
        })
    } catch (error) {
        dispatch({type: ORDER_ERROR_REQUEST});
    }
}
