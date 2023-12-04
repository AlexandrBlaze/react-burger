import {
    INGREDIENT_BUN_ITEM_ADD,
    INGREDIENT_ITEM_ADD,
    INGREDIENT_ITEM_MOVED,
    INGREDIENT_ITEM_REMOVE
} from "../../actions/burgerConstructorActions";
import {IIngredientItem} from "../ingredientsReducer/ingredientsReducer";

interface IBurgerConstructorState {
    items: IIngredientItem[],
    bun: IIngredientItem | null,
}

type TIngredientItemAdd = {
    type: typeof INGREDIENT_ITEM_ADD,
    payload: IIngredientItem[],
}
type TIngredientItemMoved = {
    type: typeof INGREDIENT_ITEM_MOVED,
    payload: IIngredientItem[],
}
type TIngredientItemRemove = {
    type: typeof INGREDIENT_ITEM_REMOVE,
    payload: IIngredientItem[],
}
type TIngredientBunItemAdd = {
    type: typeof INGREDIENT_BUN_ITEM_ADD,
    payload: IIngredientItem,
}

type TBurgerConstructor = TIngredientItemAdd | TIngredientItemMoved | TIngredientItemRemove | TIngredientBunItemAdd

const initialState: IBurgerConstructorState = {
    items: [],
    bun: null,
}
export default function burgerConstructorReducer(state = initialState, action: TBurgerConstructor): IBurgerConstructorState {
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
