export function ingredientsReducer(state, action) {
    switch (action.type) {
        case 'getRequest':
            return {
                ...state,
                loader: true,
            }
        case 'success': {
            return {
                ...state,
                items: action.payload,
                loader: false,
            }
        }
        case 'error': {
            return {
                ...state,
                loader: false,
                error: true,
            }
        }
    }
}
