import request from "../../utils/requestHelper";
import {AppThunk} from "../reducers/rootReducer";

export const INGREDIENTS_GET_REQUEST = 'INGREDIENTS_GET_REQUEST'
export const INGREDIENTS_SUCCESS_REQUEST = 'INGREDIENTS_SUCCESS_REQUEST'
export const INGREDIENTS_ERROR_REQUEST = 'INGREDIENTS_ERROR_REQUEST'

export  const getIngredientsData = (): AppThunk => async (dispatch) => {
    try {
        dispatch({type: INGREDIENTS_GET_REQUEST});
        const res = await request('ingredients');
        const {data} = await res;
        dispatch({
            type: INGREDIENTS_SUCCESS_REQUEST,
            payload: data,
        })
    } catch (error) {
        dispatch({type: INGREDIENTS_ERROR_REQUEST});
    }
}
