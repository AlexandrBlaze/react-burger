import {CLOSE_INFO_MODAL, OPEN_INFO_MODAL} from "../../actions/showInfoModalAction";
import {IIngredientItem} from "../ingredientsReducer/ingredientsReducer";

interface IShowModalInfoState {
    modalData: IIngredientItem | null,
    modalInfoVisible: boolean,
}

type TOpenInfoModal = {
    type: typeof OPEN_INFO_MODAL,
    payload: IIngredientItem,
}
type TCloseInfoModal = {
    type: typeof CLOSE_INFO_MODAL
}
type TShowModalInfo = TOpenInfoModal | TCloseInfoModal

const defaultState: IShowModalInfoState = {
    modalData: null,
    modalInfoVisible: false,
}

export function showInfoModalReducer(state = defaultState, action: TShowModalInfo): IShowModalInfoState {
    switch (action.type) {
        case OPEN_INFO_MODAL:
            return {
                ...state,
                modalData: action.payload,
                modalInfoVisible: true,
            }
        case CLOSE_INFO_MODAL:
            return {
                ...state,
                modalData: null,
                modalInfoVisible: false,
            }
        default:
            return state;
    }
}
