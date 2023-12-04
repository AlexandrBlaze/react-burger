

import detailedOrderCardReducer from "./detailedOrderCardReducer";
import {
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_RESET,
    GET_ORDER_BY_ID_SUCCESS
} from "../../actions/detailedOrderCardActions";

const initialState = {
    order: {},
    loader: false,
    error: false,
}


describe("detailedOrderCardReducer", () => {
    it("should return the detailedOrderCardReducer initial state", () => {
        expect(detailedOrderCardReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle GET_ORDER_BY_ID_REQUEST", () => {
        const expectState = {
            ...initialState,
            loader: true,
        };

        expect(
            detailedOrderCardReducer(initialState, {
                type: GET_ORDER_BY_ID_REQUEST,
                loader: true,
            })
        ).toEqual(expectState);
    });

    it("should handle GET_ORDER_BY_ID_SUCCESS", () => {
        const expectState = {
            ...initialState,
            order: {},
            loader: false
        };

        expect(
            detailedOrderCardReducer(initialState, {
                type: GET_ORDER_BY_ID_SUCCESS,
                payload: {},
                loader: false
            })
        ).toEqual(expectState);
    });
    it("should handle GET_ORDER_BY_ID_RESET", () => {
        const expectState = {
            ...initialState,
            order: {}
        };

        expect(
            detailedOrderCardReducer(initialState, {
                type: GET_ORDER_BY_ID_RESET,
                order: {}
            })
        ).toEqual(expectState);
    });

    it("should handle GET_ORDER_BY_ID_ERROR", () => {
        const expectState = {
            ...initialState,
            loader: false
        };

        expect(
            detailedOrderCardReducer(initialState, {
                type: GET_ORDER_BY_ID_ERROR,
                loader: false
            })
        ).toEqual(expectState);
    });

});