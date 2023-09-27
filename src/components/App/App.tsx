import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import {checkUserAuth} from "../../services/actions/authActions";
import {OnlyAuth, OnlyUnAuth} from "./protected-route";
import {ProtectedResetRoute} from "./protected-reset-route";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../BurgerIngredients/IngredientCard/modals/IngredientDetails/IngredientDetails";
import {hideInfoModal} from "../../services/actions/showInfoModalAction";
import IngredientsDetails from "../../pages/IngredientsDetails/IngredientsDetails";
import {getIngredientsData} from "../../services/actions/ingredientsActions";
import {useAppDispatch, useAppSelector} from "./hooks";


function App() {
    const userActionsLoader = useAppSelector((state) => {
        return state.authData.user_actions_loader
    });
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch(getIngredientsData());
    }, [dispatch]);

    function closeModal() {
        navigate(-1);
        dispatch(hideInfoModal());
    }

    return (
        <>
            {userActionsLoader && <Loader/>}

                <AppHeader/>
                <Routes location={background || location}>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<OnlyUnAuth component={<Login/>}/>}/>
                    <Route path="/register" element={<OnlyUnAuth component={<Register/>}/>}/>
                    <Route path='/ingredients/:ingredientId'
                           element={<IngredientsDetails />} />
                    <Route path="/forgot-password" element={
                        <OnlyUnAuth component={
                            <ForgotPassword />
                        }/>
                    }/>
                    <Route path="/reset-password" element={
                        <OnlyUnAuth component={
                            <ProtectedResetRoute component={
                                <ResetPassword />
                            }/>
                        }/>
                    }/>
                    <Route path="/profile" element={<OnlyAuth component={<Profile/>} />}/>
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>
                {background && (
                    <Routes>
                        <Route
                            path='/ingredients/:ingredientId'
                            element={
                                <Modal toggleModal={closeModal} modalTitle={'Детали ингредиента'}>
                                    <IngredientDetails/>
                                </Modal>
                            }
                        />
                    </Routes>
                )}
        </>
    );
}

export default App;
