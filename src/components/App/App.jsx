import React, {useEffect, useState} from 'react';
import { AppHeader } from "../AppHeader/AppHeader";
import appStyles from './App.module.css';
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

const api_url = 'https://norma.nomoreparties.space/api/ingredients '

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const getIngredientsData = async () => {
        try {
            setLoader(true);
            const res = await fetch(api_url);
            if (!res.ok) {
                throw new Error("Ошибка в response");
            }
            const data = await res.json();
            setIngredients(data.data);
            setLoader(false)
        } catch (error) {
            setError(true)
            setLoader(false)
        }
    }

    useEffect(() => {
        getIngredientsData();
    }, [])


    return (
        <main className={appStyles.app}>
            <AppHeader />
            {error && <div>Ошибка сервера</div>}
            {loader && <div>загрузка</div>}
            { (!error && !loader) &&
                <div className={appStyles.content}>
                    <div className={appStyles.halfLeft}>
                        <BurgerIngredients ingredientItems={ingredients} />
                    </div>
                    <div className={appStyles.halfRight}>
                        <BurgerConstructor constructorItems={ingredients}/>
                    </div>
                </div>
            }
        </main>
    );
}

export default App;
