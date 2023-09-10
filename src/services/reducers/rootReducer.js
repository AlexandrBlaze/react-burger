import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {showInfoModalReducer} from "./showInfoModalReducer";
import createOrderReducer from "./сreateOrderReducer";
import burgerConstructorReducer from "./burgerConstructorReducer";
import authReducer from "./authReducer";

const rootReducer= combineReducers({
    authData: authReducer,
    ingredients: ingredientsReducer,
    modalInfo: showInfoModalReducer,
    orderInfo: createOrderReducer,
    ingredientsConstructor: burgerConstructorReducer,
})


const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : composeWithDevTools;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer)
