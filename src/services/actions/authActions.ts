import request from "../../utils/requestHelper";
import {BASE_URL} from "../../ApiUlrs/apiUrls";
import {AppThunk} from "../reducers/rootReducer";
import {IUser} from "../reducers/authReducer";
export const AUTH_FETCH_START = 'AUTH_FETCH_START';
export const SET_USER_DATA = 'SET_USER_DATA';
export const AUTH_FETCH_COMPLETE = 'FETCH_COMPLETE';
export const AUTH_FETCH_ERROR = 'AUTH_FETCH_ERROR';
export const USER_IS_AUTH = 'USER_IS_AUTH';
export const USER_IS_NOT_IDENTIFIED = 'USER_IS_NOT_IDENTIFIED';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const SET_RESET_STATE = 'SET_RESET_STATE';
export const RESET_FETCH_ERROR = 'RESET_FETCH_ERROR';
export const RESET_FETCH_COMPLETE = 'RESET_FETCH_COMPLETE';

function saveTokenToLocalStorage(access: string, refresh: string) {
    const userTokens = { accessToken: access, refreshToken: refresh };
    localStorage.setItem('tokens', JSON.stringify(userTokens));
}
export const registerUser = (name: string, email: string, password: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch({type: AUTH_FETCH_START})
            const userParams: IUser = {
                name,
                email,
                password
            };
            const res = await request('auth/register', {
                method: 'POST',
                headers: {'Content-type': 'application/json; charset=UTF-8',},
                body: JSON.stringify(userParams)
            })
            saveTokenToLocalStorage(res.accessToken, res.refreshToken);
            dispatch({type: SET_USER_DATA, payload: res});
            dispatch({type: AUTH_FETCH_COMPLETE})
        } catch (error) {
            dispatch({type: AUTH_FETCH_ERROR});
        }
    }
}

export const logout = (): AppThunk => async (dispatch, getState) => {
    const params = {
        token: getState().authData.refreshToken,
    }
    try {
        dispatch({type: AUTH_FETCH_START})
        const res = request('auth/logout', {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8',},
            body: JSON.stringify(params)
        })
        localStorage.removeItem("tokens");
        dispatch({type: CLEAR_USER_DATA})
        dispatch({type: AUTH_FETCH_COMPLETE})
        dispatch({type: USER_IS_NOT_IDENTIFIED})
    } catch (err) {
        console.error(err);
    }

}
export const signIn = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch({type: AUTH_FETCH_START})
        const params = {
            email,
            password,
        };
        const res = await request('auth/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8',},
            body: JSON.stringify(params)
        })
        saveTokenToLocalStorage(res.accessToken, res.refreshToken);
        dispatch({type: SET_USER_DATA, payload: res})
        dispatch({type: AUTH_FETCH_COMPLETE})
        dispatch({type: USER_IS_AUTH})
    } catch (error) {
        dispatch({type: AUTH_FETCH_ERROR});
        dispatch({type: USER_IS_NOT_IDENTIFIED})
    }
}

export const checkUserAuth = (): AppThunk => async (dispatch) =>  {
    const storedUser = JSON.parse(localStorage.getItem('tokens') || "");
    if (storedUser?.refreshToken || storedUser?.accessToken) {
        dispatch({type: AUTH_FETCH_START});
        const userData = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: storedUser.accessToken
            },
        })
        dispatch({
            type: SET_USER_DATA,
            payload: {
                accessToken: storedUser.accessToken,
                refreshToken: storedUser.refreshToken,
                user: {
                    email: userData.user.email,
                    name: userData.user.name,
                }
            }
        });
        dispatch({type: USER_IS_AUTH})
        dispatch({type: AUTH_FETCH_COMPLETE})
    } else {
        dispatch({type: USER_IS_NOT_IDENTIFIED})
    }
};



const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = (refresh: string) => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: refresh,
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    const storedUser = JSON.parse(localStorage.getItem('tokens') || "");
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        // @ts-ignore
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(storedUser.refreshToken); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            // обновляем полученные токены в localStorage
            saveTokenToLocalStorage(refreshData.accessToken, refreshData.refreshToken);
            options.headers = {...options.headers, authorization: refreshData.accessToken}
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const updateUserData = (name: string, email: string, password: string): AppThunk => async (dispatch, getState) => {
    try {
        dispatch({type: AUTH_FETCH_START});
        const res = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: getState().authData.accessToken,
            },
            body: JSON.stringify({name, email, password})
        });
        dispatch({type: UPDATE_USER_DATA, payload: res})
        dispatch({type: AUTH_FETCH_COMPLETE})
    } catch (err) {
        dispatch({type: AUTH_FETCH_ERROR})
        console.error(err);
    }
}


export const passwordRecovery = (email: string): AppThunk => async (dispatch) => {
    try {
        dispatch({type: AUTH_FETCH_START});
        const res = await request('password-reset', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({email: email})
        });
        dispatch({type: AUTH_FETCH_COMPLETE})
        dispatch({type: SET_RESET_STATE, payload: true})
    } catch (err) {
        dispatch({type: SET_RESET_STATE, payload: false})
        dispatch({type: AUTH_FETCH_ERROR})
        console.error(err);
    }
}

export const passwordReset = (password: string, reset_code: string): AppThunk => async (dispatch) => {
    try {
        dispatch({type: AUTH_FETCH_START});
        const res = await request('password-reset/reset', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({password: password, token: reset_code})
        });
        dispatch({type: RESET_FETCH_COMPLETE})
        if (res.success) {
            dispatch({type: SET_RESET_STATE, payload: false})
        } else {
            dispatch({type: RESET_FETCH_ERROR, message: 'Не верно введен проверочный код'})
        }

    } catch (err) {
        dispatch({type: AUTH_FETCH_ERROR})
        console.error(err);
    }
}