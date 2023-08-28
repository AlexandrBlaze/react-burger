import {BASE_URL} from "../../api_urls/api_urls";
import checkResponse from "../../utils/checkResponse";

export const INGREDIENTS_GET_REQUEST = 'INGREDIENTS_GET_REQUEST'
export const INGREDIENTS_SUCCESS_REQUEST = 'INGREDIENTS_SUCCESS_REQUEST'
export const INGREDIENTS_ERROR_REQUEST = 'INGREDIENTS_ERROR_REQUEST'

export  const getIngredientsData = () => async (dispatch) => {
    try {
        dispatch({type: INGREDIENTS_GET_REQUEST});
        const res = await fetch(`${BASE_URL}/ingredients`);
        checkResponse(res)
        const {data} = await res.json();
        dispatch({
            type: INGREDIENTS_SUCCESS_REQUEST,
            payload: data,
        })
    } catch (error) {
        dispatch({type: INGREDIENTS_ERROR_REQUEST});
    }
}
