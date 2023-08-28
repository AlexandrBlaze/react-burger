export const INGREDIENT_ITEM_ADD = 'INGREDIENT_ITEM_ADD'
export const INGREDIENT_BUN_ITEM_ADD = 'INGREDIENT_BUN_ITEM_ADD'
export const INGREDIENT_ITEM_MOVED = 'INGREDIENT_ITEM_MOVED'
export const INGREDIENT_ITEM_REMOVE = 'INGREDIENT_ITEM_REMOVE'



export const removeItem = (index) => async (dispatch, getState) => {
    getState().ingredientsConstructor.items.splice(index, 1);

    dispatch({
        type: INGREDIENT_ITEM_REMOVE,
        payload:  [...getState().ingredientsConstructor.items],
    })
}


export const moveCard = (dragIndex, hoverIndex) => (dispatch, getState) => {
    const dragCard = getState().ingredientsConstructor.items[dragIndex];
    const newCards = [...getState().ingredientsConstructor.items];
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch({
        type: INGREDIENT_ITEM_MOVED,
        payload: newCards
    })
}
