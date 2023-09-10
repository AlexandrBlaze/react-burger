import request from "../../utils/requestHelper";
import {BASE_URL} from "../../ApiUlrs/apiUrls";
import {redirect} from "react-router-dom";

export const AUTH_FETCH_START = 'AUTH_FETCH_START';
export const SET_USER_DATA = 'SET_USER_DATA';
export const AUTH_FETCH_COMPLETE = 'FETCH_COMPLETE';
export const AUTH_FETCH_ERROR = 'AUTH_FETCH_ERROR';
export const USER_IS_AUTH = 'USER_IS_AUTH';
export const USER_IS_NOT_IDENTIFIED = 'USER_IS_NOT_IDENTIFIED';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

function saveTokenToLocalStorage(access, refresh) {
    const userTokens = { accessToken: access, refreshToken: refresh };
    localStorage.setItem('tokens', JSON.stringify(userTokens));
}
export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: AUTH_FETCH_START})
        const userParams = {
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

export const logout = async (dispatch, getState) => {
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
export const signIn = (email, password) => async (dispatch) => {
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

export const checkUserAuth = () => async (dispatch) =>  {
    const storedUser = JSON.parse(localStorage.getItem('tokens'));
    if (storedUser.refreshToken || storedUser.accessToken) {
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



const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = (refresh) => {
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

export const fetchWithRefresh = async (url, options) => {
    const storedUser = JSON.parse(localStorage.getItem('tokens'));
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(storedUser.refreshToken); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            // обновляем полученные токены в localStorage
            saveTokenToLocalStorage(refreshData.accessToken, refreshData.refreshToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const updateUserData = (name, email, password) => async (dispatch, getState) => {
    debugger
    const params = {
        name,
        email
    }
    if (password.length) {
        params.password = password;
    }
    try {
        dispatch({type: AUTH_FETCH_START});
        const res = request('auth/user', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: getState().authData.accessToken,
            },
            body: JSON.stringify({params})
        });
        dispatch({type: UPDATE_USER_DATA, payload: res})
        dispatch({type: AUTH_FETCH_COMPLETE})
    } catch (err) {
        dispatch({type: AUTH_FETCH_ERROR})
        console.error(err);
    }
}