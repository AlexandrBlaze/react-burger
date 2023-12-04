
import {showInfoModalReducer} from "./showInfoModalReducer";
import {CLOSE_INFO_MODAL, OPEN_INFO_MODAL} from "../../actions/showInfoModalAction";


const initialState = {
    modalData: null,
    modalInfoVisible: false,
}
describe("showInfoModalReducer", () => {
    it("should return the showInfoModalReducer initial state", () => {
        expect(showInfoModalReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle OPEN_INFO_MODAL", () => {
        const expectState = {
            ...initialState,
            modalData: {},
            modalInfoVisible: true,
        };
        expect(
            showInfoModalReducer(initialState, {
                type: OPEN_INFO_MODAL,
                payload: {},
                modalInfoVisible: true,
            })
        ).toEqual(expectState);
    });

    it("should handle CLOSE_INFO_MODAL", () => {
        const expectState = {
            ...initialState,
            modalData: null,
            modalInfoVisible: false,
        };
        expect(
            showInfoModalReducer(initialState, {
                type: CLOSE_INFO_MODAL,
                modalData: null,
                modalInfoVisible: false,
            })
        ).toEqual(expectState);
    });
});