
import createOrderReducer from "./сreateOrderReducer";
import {
    ORDER_ERROR_REQUEST,
    ORDER_GET_REQUEST,
    ORDER_MODAL_CLOSE,
    ORDER_SUCCESS_REQUEST
} from "../../actions/createOrderActions";


const initialState = {
    orderData: {},
    loader: false,
    error: false,
    orderModalVisible: false,
}
describe("createOrderReducer", () => {
    it("should return the createOrderReducer initial state", () => {
        expect(createOrderReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle ORDER_GET_REQUEST", () => {
        const expectState = {
            ...initialState,
            loader: true,
        };
        expect(
            createOrderReducer(initialState, {
                type: ORDER_GET_REQUEST,
                loader: true,
            })
        ).toEqual(expectState);
    });

    it("should handle ORDER_SUCCESS_REQUEST", () => {
        const expectState = {
            ...initialState,
            orderData: {},
            loader: false,
            orderModalVisible: true,
        };
        expect(
            createOrderReducer(initialState, {
                type: ORDER_SUCCESS_REQUEST,
                payload: {},
                loader: false,
                orderModalVisible: true,
            })
        ).toEqual(expectState);
    });

    it("should handle ORDER_ERROR_REQUEST", () => {
        const expectState = {
            ...initialState,
            loader: false,
            error: true,
        };
        expect(
            createOrderReducer(initialState, {
                type: ORDER_ERROR_REQUEST,
                loader: false,
                error: true,
            })
        ).toEqual(expectState);
    });
    it("should handle ORDER_MODAL_CLOSE", () => {
        const expectState = {
            ...initialState,
            orderData: {},
            orderModalVisible: false,
        };
        expect(
            createOrderReducer(initialState, {
                type: ORDER_MODAL_CLOSE,
                orderData: {},
                orderModalVisible: false,
            })
        ).toEqual(expectState);
    });

});