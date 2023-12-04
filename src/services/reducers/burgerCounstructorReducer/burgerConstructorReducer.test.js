import burgerConstructorReducer from "./burgerConstructorReducer";
import {
    INGREDIENT_BUN_ITEM_ADD,
    INGREDIENT_ITEM_ADD,
    INGREDIENT_ITEM_MOVED,
    INGREDIENT_ITEM_REMOVE
} from "../../actions/burgerConstructorActions";


const initialState = {
    items: [],
    bun: null,
}

describe("burgerConstructorReducer", () => {
    it("should return the burgerConstructorReducer initial state", () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle INGREDIENT_ITEM_ADD", () => {
        const expectState = {
            ...initialState,
            items: [],
        };

        expect(
            burgerConstructorReducer(initialState, {
                type: INGREDIENT_ITEM_ADD,
                payload: [],
            })
        ).toEqual(expectState);
    });

    it("should handle INGREDIENT_ITEM_MOVED", () => {
        const expectState = {
            ...initialState,
            items: [],
        };

        expect(
            burgerConstructorReducer(initialState, {
                type: INGREDIENT_ITEM_MOVED,
                payload: [],
            })
        ).toEqual(expectState);
    });
    it("should handle INGREDIENT_ITEM_REMOVE", () => {
        const expectState = {
            ...initialState,
            items: [],
        };

        expect(
            burgerConstructorReducer(initialState, {
                type: INGREDIENT_ITEM_REMOVE,
                payload: [],
            })
        ).toEqual(expectState);
    });

    it("should handle INGREDIENT_BUN_ITEM_ADD", () => {
        const expectState = {
            ...initialState,
            bun: {},
        };

        expect(
            burgerConstructorReducer(initialState, {
                type: INGREDIENT_BUN_ITEM_ADD,
                payload: {},
            })
        ).toEqual(expectState);
    });

});