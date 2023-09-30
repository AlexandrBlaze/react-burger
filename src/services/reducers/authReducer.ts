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

export interface IUser {
    name: string,
    email: string,
    password?: string,
}

interface IAuthState {
    accessToken: string,
    refreshToken: string,
    user: null | IUser,
    is_auth: boolean,
    isResetPassword: boolean,
    resetFetchHasError: {
        error: boolean,
        message: string
    },
    user_actions_error: boolean,
    user_actions_loader: boolean,
}

const initialState: IAuthState = {
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

type TAuthFetchStart = {
    type: typeof AUTH_FETCH_START,
    user_actions_loader: boolean
}
type TAuthFetchComplete = {
    type: typeof AUTH_FETCH_COMPLETE,
    user_actions_loader: boolean,
    user_actions_error: boolean,
}
type TAuthFetchError = {
    type: typeof AUTH_FETCH_ERROR,
    user_actions_loader: boolean,
    user_actions_error: boolean,
}
type TSetUserData = {
    type: typeof SET_USER_DATA,
    payload: {
        accessToken: string,
        refreshToken: string,
        user: IUser,
    }
}
type TUpdateToken = {
    type: typeof UPDATE_TOKEN,
    payload: {
        accessToken: string,
        refreshToken: string,
    }
}
type TUpdateUserData = {
    type: typeof UPDATE_USER_DATA,
    payload: {
        user: IUser
    }
}
type TUserIsAuth ={
    type: typeof USER_IS_AUTH
}
type TUserIsNotIdentified ={
    type: typeof USER_IS_NOT_IDENTIFIED
}
type TClearUserData = {
    type: typeof CLEAR_USER_DATA
}
type TSetResetState = {
    type: typeof SET_RESET_STATE,
    payload: boolean,
}
type TResetFetchError = {
    type: typeof RESET_FETCH_ERROR,
    message: string,
}
type TResetFetchComplete = {
    type: typeof RESET_FETCH_COMPLETE
}

type TAuthActions = TAuthFetchStart | TAuthFetchComplete | TSetUserData | TUpdateToken | TUpdateUserData | TAuthFetchError | TUserIsAuth | TUserIsNotIdentified | TClearUserData | TSetResetState | TResetFetchError | TResetFetchComplete

export default function authReducer(state = initialState, actions: TAuthActions): IAuthState {
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
            return {
                ...state,
                user: null
            };
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