import React, {useEffect, useState} from 'react';
import { AppHeader } from "../AppHeader/AppHeader";
import appStyles from './App.module.css';
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsData} from "../../services/actions/ingredientsActions";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {
    const { error, loader } = useSelector(store => ({
        error: store.ingredients.error,
        loader: store.ingredients.loader
    }))
    const dispatch = useDispatch();
     useEffect( () => {
         dispatch(getIngredientsData());
    }, [])

    return (
        <>
            <AppHeader />
            <main className={appStyles.app}>
                {error && <div>Ошибка сервера</div>}
                {loader && <div>загрузка</div>}
                { (!error && !loader) &&
                    <div className={appStyles.content}>
                        <DndProvider backend={HTML5Backend}>
                            <div className={appStyles.halfLeft}>
                                <BurgerIngredients />
                            </div>
                            <div className={appStyles.halfRight}>
                                <BurgerConstructor />
                            </div>
                        </DndProvider>
                    </div>
                }
            </main>
        </>

    );
}

export default App;
