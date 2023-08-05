import React from 'react';
import { AppHeader } from "../AppHeader/AppHeader";
import appStyles from './App.module.css';
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";


function App() {
  return (
    <main className={appStyles.app}>
      <AppHeader />
        <div className={appStyles.content}>
            <div className={appStyles.halfLeft}>
                <BurgerIngredients />
            </div>
            <div className={appStyles.halfRight}>
                <BurgerConstructor/>
            </div>
        </div>
    </main>
  );
}

export default App;
