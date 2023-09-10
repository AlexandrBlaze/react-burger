import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import {AppHeader} from "../AppHeader/AppHeader";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import Profile from "../../pages/Profile/Profile";
import Loader from "../Loader/Loader";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkUserAuth} from "../../services/actions/authActions";
import * as PropTypes from "prop-types";
import {OnlyAuth, OnlyUnAuth} from "./protected-route";


function App() {
    const userActionsLoader = useSelector((store) => store.authData.user_actions_loader);
    console.log(userActionsLoader)

    const dispatch = useDispatch();
    const isAuth = useSelector(store => store.authData.is_auth)
    console.log('Пользователь авторизован', isAuth)

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);
    return (
        <>
            {userActionsLoader && <Loader/>}
            <BrowserRouter>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<OnlyUnAuth component={<Login/>}/>}/>
                    <Route path="/register" element={<OnlyUnAuth component={<Register/>}/>}/>
                    <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                    <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
                    <Route path="/profile" element={<OnlyAuth component={<Profile/>} />}/>
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
