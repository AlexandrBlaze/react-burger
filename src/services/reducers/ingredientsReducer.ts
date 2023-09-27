import {
    INGREDIENTS_ERROR_REQUEST,
    INGREDIENTS_GET_REQUEST,
    INGREDIENTS_SUCCESS_REQUEST
} from "../actions/ingredientsActions";

export interface IIngredientItem {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    _id: string,
    __v: number,
    uniqueId: number
}

type TGetIngredients = {
    type: typeof INGREDIENTS_GET_REQUEST,
}

type TGetIngredientsSuccess = {
    type: typeof INGREDIENTS_SUCCESS_REQUEST,
    payload: IIngredientItem[],
}

type TGetIngredientsError = {
    type: typeof INGREDIENTS_ERROR_REQUEST,
}

type TIngredientsActions = TGetIngredients | TGetIngredientsSuccess | TGetIngredientsError

interface IDefaultIngredientsState {
    ingredientItems: IIngredientItem[],
    loader: boolean,
    error: boolean,
}

const defaultState: IDefaultIngredientsState = {
    ingredientItems: [],
    loader: false,
    error: false,
}
export default function ingredientsReducer(state = defaultState, action: TIngredientsActions): IDefaultIngredientsState {
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

