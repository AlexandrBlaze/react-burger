import {IModalParams} from "../../components/BurgerIngredients/IngredientCard/IngredientCard";

export const OPEN_INFO_MODAL = 'OPEN_INFO_MODAL'
export const CLOSE_INFO_MODAL = 'CLOSE_INFO_MODAL'



export const showInfoModal = (obj: IModalParams) => ({type: OPEN_INFO_MODAL, payload: obj})
export const hideInfoModal = () => ({type: CLOSE_INFO_MODAL})
