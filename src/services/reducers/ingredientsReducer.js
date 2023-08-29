import {
    INGREDIENTS_ERROR_REQUEST,
    INGREDIENTS_GET_REQUEST,
    INGREDIENTS_SUCCESS_REQUEST
} from "../actions/ingredientsActions";

const defaultState = {
    ingredientItems: [],
    loader: false,
    error: false,
}
export default function ingredientsReducer(state = defaultState, action) {
    switch (action.type) {
        case INGREDIENTS_GET_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case INGREDIENTS_SUCCESS_REQUEST: {
            return {
                ...state,
                ingredientItems: action.payload,
                loader: false,
            }
        }
        case INGREDIENTS_ERROR_REQUEST: {
            return {
                ...state,
                loader: false,
                error: true,
            }
        }
        default:
            return state;
    }
}

