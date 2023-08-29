import {
    INGREDIENT_BUN_ITEM_ADD,
    INGREDIENT_ITEM_ADD,
    INGREDIENT_ITEM_MOVED,
    INGREDIENT_ITEM_REMOVE
} from "../actions/burgerConstructorActions";


const initialState = {
    items: [],
    bun: null,
}
export default function burgerConstructorReducer(state = initialState, action) {
    switch (action.type) {
        case INGREDIENT_ITEM_ADD: {
            return {
                ...state,
                items: action.payload
            }
        }
        case INGREDIENT_ITEM_MOVED: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case INGREDIENT_ITEM_REMOVE: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case INGREDIENT_BUN_ITEM_ADD: {
            return {
                ...state,
                bun: action.payload,
            }
        }
        default:
            return state;
    }

}
