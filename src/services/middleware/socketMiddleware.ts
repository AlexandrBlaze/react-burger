import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch, RootState} from "../reducers/rootReducer";
import {getCurrentTimestamp} from "../../utils/datetime";

import {
    ORDER_WS_CONNECTION_CLOSED, ORDER_WS_CONNECTION_ERROR,
    ORDER_WS_CONNECTION_START,
    ORDER_WS_CONNECTION_SUCCESS, ORDER_WS_GET_MESSAGE,
    ORDER_WS_SEND_MESSAGE
} from "../actions/orderWsActions";
import {
    FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_ERROR,
    FEED_WS_CONNECTION_START,
    FEED_WS_CONNECTION_SUCCESS, FEED_WS_GET_MESSAGE,
    FEED_WS_SEND_MESSAGE
} from "../actions/feedWsActions";
export type TOrderWsActions = {
    wsInit: typeof ORDER_WS_CONNECTION_START,
    wsSendMessage: typeof ORDER_WS_SEND_MESSAGE,
    onOpen: typeof ORDER_WS_CONNECTION_SUCCESS,
    onClose:typeof ORDER_WS_CONNECTION_CLOSED,
    onError: typeof ORDER_WS_CONNECTION_ERROR,
    onMessage: typeof ORDER_WS_GET_MESSAGE
};

export type TFeedWsActions = {
    wsInit: typeof  FEED_WS_CONNECTION_START,
    wsSendMessage: typeof  FEED_WS_SEND_MESSAGE,
    onOpen: typeof  FEED_WS_CONNECTION_SUCCESS,
    onClose: typeof FEED_WS_CONNECTION_CLOSED,
    onError: typeof  FEED_WS_CONNECTION_ERROR,
    onMessage: typeof  FEED_WS_GET_MESSAGE,
};

export type TWSStoreActions = TFeedWsActions | TOrderWsActions;

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let url = '';

        return next => (action) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const {
                wsInit,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage
            } = wsActions;
            const token = getState().authData.accessToken;

            const wordToDelete = "Bearer ";
            const clearedToken = token.replace(new RegExp(wordToDelete, "g"), "");
            url = `${action.payload}?token=${clearedToken}`;

            if (type === wsInit && token) {
                socket = new WebSocket(url);
                console.log('connect')
            }

            if (socket) {
                socket.onopen = event => {
                    console.log('onopen', event)
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {

                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: { ...restParsedData, timestamp: getCurrentTimestamp() } });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const payload = action.payload;
                    const message = { ...payload, token: token };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};