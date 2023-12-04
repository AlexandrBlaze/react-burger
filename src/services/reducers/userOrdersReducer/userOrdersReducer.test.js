
import {CLOSE_INFO_MODAL, OPEN_INFO_MODAL} from "../../actions/showInfoModalAction";
import userOrdersReducer from "./userOrdersReducer";
import {
    ORDER_WS_CONNECTION_CLOSED,
    ORDER_WS_CONNECTION_ERROR,
    ORDER_WS_CONNECTION_SUCCESS, ORDER_WS_GET_MESSAGE
} from "../../actions/orderWsActions";

const testPayload = {
    orders: [],
    total: 99,
    totalToday: 200,
}

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isOpen: false,
    error: null,
}
describe("userOrdersReducer", () => {
    it("should return the userOrdersReducer initial state", () => {
        expect(userOrdersReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle ORDER_WS_CONNECTION_SUCCESS", () => {
        const expectState = {
            ...initialState,
            isOpen: true,
            error: null,
        };
        expect(
            userOrdersReducer(initialState, {
                type: ORDER_WS_CONNECTION_SUCCESS,
                isOpen: true,
                error: null,
            })
        ).toEqual(expectState);
    });

    it("should handle ORDER_WS_CONNECTION_ERROR", () => {
        const expectState = {
            ...initialState,
            error: '',
        };
        expect(
            userOrdersReducer(initialState, {
                type: ORDER_WS_CONNECTION_ERROR,
                payload: '',
            })
        ).toEqual(expectState);
    });

    it("should handle ORDER_WS_CONNECTION_CLOSED", () => {
        const expectState = {
            ...initialState,
            isOpen: false,
        };
        expect(
            userOrdersReducer(initialState, {
                type: ORDER_WS_CONNECTION_CLOSED,
                isOpen: false,
            })
        ).toEqual(expectState);
    });

    it("should handle ORDER_WS_GET_MESSAGE", () => {
        const expectState = {
            ...initialState,
            orders: testPayload.orders,
            total: testPayload.total,
            totalToday: testPayload.totalToday,
        };
        expect(
            userOrdersReducer(initialState, {
                type: ORDER_WS_GET_MESSAGE,
                payload: testPayload,
            })
        ).toEqual(expectState);
    });
});