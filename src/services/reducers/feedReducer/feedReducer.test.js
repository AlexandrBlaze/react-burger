import feedReducer from "./feedReducer";
import {
    FEED_WS_CONNECTION_CLOSED,
    FEED_WS_CONNECTION_ERROR,
    FEED_WS_CONNECTION_SUCCESS, FEED_WS_GET_MESSAGE
} from "../../actions/feedWsActions";


const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isOpen: false,
    error: null,
}
describe("feedReducer", () => {
    it("should return the feedReducer initial state", () => {
        expect(feedReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle FEED_WS_CONNECTION_SUCCESS", () => {
        const expectState = {
            ...initialState,
            isOpen: true,
            error: null,
        };
        expect(
            feedReducer(initialState, {
                type: FEED_WS_CONNECTION_SUCCESS,
                isOpen: true,
                error: null,
            })
        ).toEqual(expectState);
    });

    it("should handle FEED_WS_CONNECTION_ERROR", () => {
        const expectState = {
            ...initialState,
            error: {},
        };
        expect(
            feedReducer(initialState, {
                type: FEED_WS_CONNECTION_ERROR,
                payload: {}
            })
        ).toEqual(expectState);
    });
    it("should handle FEED_WS_CONNECTION_CLOSED", () => {
        const expectState = {
            ...initialState,
            isOpen: false,
        };
        expect(
            feedReducer(initialState, {
                type: FEED_WS_CONNECTION_CLOSED,
                isOpen: false,
            })
        ).toEqual(expectState);
    });

    it("should handle FEED_WS_GET_MESSAGE", () => {
        const expectState = {
            ...initialState,
            orders: [],
            total: 999,
            totalToday: 888,
        };
        expect(
            feedReducer(initialState, {
                type: FEED_WS_GET_MESSAGE,
                payload: {
                    orders: [],
                    total: 999,
                    totalToday: 888,
                }
            })
        ).toEqual(expectState);
    });
});