import {combineReducers, Action } from "redux";
import {createStore, applyMiddleware} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {showInfoModalReducer} from "./showInfoModalReducer";
import createOrderReducer from "./сreateOrderReducer";
import burgerConstructorReducer from "./burgerConstructorReducer";
import authReducer from "./authReducer";
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
import feedReducer from "./feedReducer";
import userOrdersReducer from "./userOrdersReducer";
import detailedOrderCardReducer from "./detailedOrderCardReducer";
import {socketMiddleware} from "../middleware/socketMiddleware";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const orderWsActions = {
    wsInit: ORDER_WS_CONNECTION_START,
    wsSendMessage: ORDER_WS_SEND_MESSAGE,
    onOpen: ORDER_WS_CONNECTION_SUCCESS,
    onClose: ORDER_WS_CONNECTION_CLOSED,
    onError: ORDER_WS_CONNECTION_ERROR,
    onMessage: ORDER_WS_GET_MESSAGE
};

const feedWsActions = {
    wsInit: FEED_WS_CONNECTION_START,
    wsSendMessage: FEED_WS_SEND_MESSAGE,
    onOpen: FEED_WS_CONNECTION_SUCCESS,
    onClose: FEED_WS_CONNECTION_CLOSED,
    onError: FEED_WS_CONNECTION_ERROR,
    onMessage: FEED_WS_GET_MESSAGE,
};

const rootReducer = combineReducers({
    authData: authReducer,
    ingredients: ingredientsReducer,
    modalInfo: showInfoModalReducer,
    orderInfo: createOrderReducer,
    ingredientsConstructor: burgerConstructorReducer,
    feedData: feedReducer,
    userOrdersData: userOrdersReducer,
    detailedOrderData: detailedOrderCardReducer,
})

const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : composeWithDevTools;

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    socketMiddleware(feedWsActions),
    socketMiddleware(orderWsActions)
));
export const store = createStore(rootReducer, enhancer);



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, Action<string>, Action>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
