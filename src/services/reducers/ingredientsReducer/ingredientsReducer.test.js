
import ingredientsReducer from "./ingredientsReducer";
import {
    INGREDIENTS_ERROR_REQUEST,
    INGREDIENTS_GET_REQUEST,
    INGREDIENTS_SUCCESS_REQUEST
} from "../../actions/ingredientsActions";


const initialState = {
    ingredientItems: [],
    loader: false,
    error: false,
}
describe("ingredientsReducer", () => {
    it("should return the ingredientsReducer initial state", () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle INGREDIENTS_GET_REQUEST", () => {
        const expectState = {
            ...initialState,
            loader: true,
        };
        expect(
            ingredientsReducer(initialState, {
                type: INGREDIENTS_GET_REQUEST,
                loader: true,
            })
        ).toEqual(expectState);
    });
    it("should handle INGREDIENTS_SUCCESS_REQUEST", () => {
        const expectState = {
            ...initialState,
            ingredientItems: [],
            loader: false,
        };
        expect(
            ingredientsReducer(initialState, {
                type: INGREDIENTS_SUCCESS_REQUEST,
                payload: [],
                loader: false,
            })
        ).toEqual(expectState);
    });

    it("should handle INGREDIENTS_ERROR_REQUEST", () => {
        const expectState = {
            ...initialState,
            loader: false,
            error: true,
        };
        expect(
            ingredientsReducer(initialState, {
                type: INGREDIENTS_ERROR_REQUEST,
                payload: {
                    loader: false,
                    error: true,
                }
            })
        ).toEqual(expectState);
    });
});