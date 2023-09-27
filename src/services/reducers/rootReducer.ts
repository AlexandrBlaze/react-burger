import {combineReducers, Action } from "redux";
import {createStore, applyMiddleware} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk, {ThunkAction} from "redux-thunk";
import {showInfoModalReducer} from "./showInfoModalReducer";
import createOrderReducer from "./сreateOrderReducer";
import burgerConstructorReducer from "./burgerConstructorReducer";
import authReducer from "./authReducer";
import {Reducer} from "react";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const rootReducer = combineReducers({
    authData: authReducer,
    ingredients: ingredientsReducer,
    modalInfo: showInfoModalReducer,
    orderInfo: createOrderReducer,
    ingredientsConstructor: burgerConstructorReducer,
})

const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : composeWithDevTools;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
