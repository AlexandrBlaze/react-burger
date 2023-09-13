import {
    AUTH_FETCH_COMPLETE,
    AUTH_FETCH_ERROR,
    AUTH_FETCH_START,
    CLEAR_USER_DATA, RESET_FETCH_COMPLETE, RESET_FETCH_ERROR,
    SET_RESET_STATE,
    SET_USER_DATA,
    UPDATE_TOKEN,
    UPDATE_USER_DATA,
    USER_IS_AUTH,
    USER_IS_NOT_IDENTIFIED
} from "../actions/authActions";


const initialState = {
    accessToken: '',
    refreshToken: '',
    user: null,
    is_auth: false,
    isResetPassword: false,
    resetFetchHasError: {
        error: false,
        message: ''
    },
    user_actions_error: false,
    user_actions_loader: false,
}

export default function authReducer(state = initialState, actions) {
    switch (actions.type) {
        case AUTH_FETCH_START:
            return {
                ...state,
                user_actions_loader: true,
            }
        case AUTH_FETCH_COMPLETE:
            return {
                ...state,
                user_actions_loader: false,
                user_actions_error: false,
            }
        case SET_USER_DATA:
            return {
                ...state,
                accessToken: actions.payload.accessToken,
                refreshToken: actions.payload.refreshToken,
                user: {
                    name: actions.payload.user.name,
                    email: actions.payload.user.email,
                },
                user_actions_loader: false,
            }
        case UPDATE_TOKEN:
            return {
                ...state,
                accessToken: actions.payload.accessToken,
                refreshToken: actions.payload.refreshToken,
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                user: {
                    name: actions.payload.user.name,
                    email: actions.payload.user.email,
                },
            }
        case AUTH_FETCH_ERROR:
            return {
                ...state,
                user_actions_loader: false,
                user_actions_error: true,
            }
        case USER_IS_AUTH:
            return {
                ...state,
                is_auth: true,
            }
        case USER_IS_NOT_IDENTIFIED:
            return  {
                ...state,
                is_auth: false
            }
        case CLEAR_USER_DATA:
            return state.user = null;
        case SET_RESET_STATE: {
            return {
                ...state,
                isResetPassword: actions.payload,
            }
        }
        case RESET_FETCH_ERROR: {
            return {
                ...state,
                resetFetchHasError: {
                    error: true,
                    message: actions.message,
                }
            }
        }
        case RESET_FETCH_COMPLETE:
            return {
                ...state,
                user_actions_loader: false,
                resetFetchHasError: {
                    error: false,
                    message: '',
                }
            }
        default:
            return state;
    }
}