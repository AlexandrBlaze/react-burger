import React, {useEffect, useReducer} from 'react';
import { AppHeader } from "../AppHeader/AppHeader";
import appStyles from './App.module.css';
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import {ingredientsReducer} from "../../ingredientsReducer";
import {IngredientsContext} from "../../contexts/ingredientsContext";

const api_url = 'https://norma.nomoreparties.space/api/ingredients '

const initialData  = {
    items: [],
    totalPrice: 0,
    loader: false,
    error: false,
};


function App() {
    const [data, dataDispatch] = useReducer(ingredientsReducer, initialData);
    const getIngredientsData = async () => {
        try {
            dataDispatch({type: 'getRequest'});
            const res = await fetch(api_url);
            if (!res.ok) {
                throw new Error("Ошибка в response");
            }
            const {data} = await res.json();
            dataDispatch({
                type: 'success',
                payload: data,
            })

        } catch (error) {
            dataDispatch({type: 'error'});
        }
    }

    useEffect(() => {
        getIngredientsData();
    }, [])

    return (
        <main className={appStyles.app}>
            <AppHeader />
            {data.error && <div>Ошибка сервера</div>}
            {data.loader && <div>загрузка</div>}
            { (!data.error && !data.loader) &&
                <IngredientsContext.Provider value={data.items}>
                    <div className={appStyles.content}>
                        <div className={appStyles.halfLeft}>
                            <BurgerIngredients />
                        </div>
                        <div className={appStyles.halfRight}>
                            <BurgerConstructor />
                        </div>
                    </div>
                </IngredientsContext.Provider>
            }
        </main>
    );
}

export default App;
