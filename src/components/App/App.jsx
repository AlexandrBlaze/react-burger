import React, {useEffect, useReducer} from 'react';
import { AppHeader } from "../AppHeader/AppHeader";
import appStyles from './App.module.css';
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import {ingredientsReducer} from "../../ingredientsReducer";
import {IngredientsContext} from "../../contexts/ingredientsContext";
import checkResponse from "../../utils/checkResponse";
import {BASE_URL} from "../../api_urls/api_urls";

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
            const res = await fetch(`${BASE_URL}/ingredients`);
            checkResponse(res)
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
        <>
            <AppHeader />
            <main className={appStyles.app}>
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
        </>

    );
}

export default App;
