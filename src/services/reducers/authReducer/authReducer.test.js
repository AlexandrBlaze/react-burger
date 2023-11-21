import authReducer from "./authReducer";
import {
    AUTH_FETCH_COMPLETE, AUTH_FETCH_ERROR,
    AUTH_FETCH_START,
    CLEAR_USER_DATA, RESET_FETCH_COMPLETE, RESET_FETCH_ERROR, SET_RESET_STATE,
    SET_USER_DATA,
    UPDATE_TOKEN, UPDATE_USER_DATA,
    USER_IS_AUTH, USER_IS_NOT_IDENTIFIED
} from "../../actions/authActions";

const testPayload = {
    accessToken: '',
    refreshToken: '',
    user: {
        name: '',
        email: '',
        password: '',
    }
}


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

describe("authReducer", () => {
    it("should return the authReducer initial state", () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle AUTH_FETCH_START", () => {
        const expectState = {
            ...initialState,
            user_actions_loader: true,
        };

        expect(
            authReducer(initialState, {
                type: AUTH_FETCH_START,
                user_actions_loader: true,
            })
        ).toEqual(expectState);
    });

    it("should handle AUTH_FETCH_COMPLETE", () => {
        const expectState = {
            ...initialState,
            user_actions_loader: false,
            user_actions_error: false,
        };

        expect(
            authReducer(initialState, {
                type: AUTH_FETCH_COMPLETE,
                user_actions_loader: false,
                user_actions_error: false,
            })
        ).toEqual(expectState);
    });

    it("should handle SET_USER_DATA", () => {
        const expectState = {
            ...initialState,
            accessToken: testPayload.accessToken,
            refreshToken: testPayload.refreshToken,
            user: {
                name: testPayload.user.name,
                email: testPayload.user.email,
            },
            user_actions_loader: false,

        };

        expect(
            authReducer(initialState,{
                type: SET_USER_DATA,
                payload: testPayload
            })
        ).toEqual(expectState);
    });

    it("should handle UPDATE_TOKEN", () => {
        const expectState = {
            ...initialState,
            accessToken: testPayload.accessToken,
            refreshToken: testPayload.refreshToken,
        };

        expect(
            authReducer(initialState,{
                type: UPDATE_TOKEN,
                payload: testPayload
            })
        ).toEqual(expectState);
    });

    it("should handle UPDATE_USER_DATA", () => {
        const expectState = {
            ...initialState,
            user: {
                name: testPayload.user.name,
                email: testPayload.user.email,
            },
        };

        expect(
            authReducer(initialState,{
                type: UPDATE_USER_DATA,
                payload: {
                    user: {
                        name: testPayload.user.name,
                        email: testPayload.user.email,
                    },
                }
            })
        ).toEqual(expectState);
    });

    it("should handle AUTH_FETCH_ERROR", () => {
        const expectState = {
            ...initialState,
            user_actions_loader: false,
            user_actions_error: true,
        };

        expect(
            authReducer(initialState,{
                type: AUTH_FETCH_ERROR,
                user_actions_loader: false,
                user_actions_error: true,
            })
        ).toEqual(expectState);
    });
    it("should handle USER_IS_AUTH", () => {
        const expectState = {
            ...initialState,
            is_auth: true,
        };

        expect(
            authReducer(initialState,{
                type: USER_IS_AUTH,
                is_auth: true,
            })
        ).toEqual(expectState);
    });
    it("should handle USER_IS_NOT_IDENTIFIED", () => {
        const expectState = {
            ...initialState,
            is_auth: false
        };

        expect(
            authReducer(initialState,{
                type: USER_IS_NOT_IDENTIFIED,
                is_auth: false
            })
        ).toEqual(expectState);
    });
    it("should handle CLEAR_USER_DATA", () => {
        const expectState = {
            ...initialState,
            user: null
        };

        expect(
            authReducer(initialState,{
                type: CLEAR_USER_DATA,
                user: null
            })
        ).toEqual(expectState);
    });
    it("should handle SET_RESET_STATE", () => {
        const expectState = {
            ...initialState,
            isResetPassword: false
        };
        expect(
            authReducer(initialState,{
                type: SET_RESET_STATE,
                payload: false

            })
        ).toEqual(expectState);
    });
    it("should handle RESET_FETCH_ERROR", () => {
        const expectState = {
            ...initialState,
            resetFetchHasError: {
                error: true,
                message: '',
            }
        };
        expect(
            authReducer(initialState,{
                type: RESET_FETCH_ERROR,
                message: '',
                resetFetchHasError: {
                    error: true,
                    message: '',
                }

            })
        ).toEqual(expectState);
    });

    it("should handle RESET_FETCH_COMPLETE", () => {
        const expectState = {
            ...initialState,
            user_actions_loader: false,
            resetFetchHasError: {
                error: false,
                message: '',
            }
        };
        expect(
            authReducer(initialState,{
                type: RESET_FETCH_COMPLETE,
                user_actions_loader: false,
                resetFetchHasError: {
                    error: false,
                    message: '',
                }

            })
        ).toEqual(expectState);
    });
});