import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css"
import { data } from "../../utils/data"
import {IngredientCard} from "./IngredientCard/IngredientCard";

export const INGREDIENTS_TYPES = {
    BUN: 'bun',
    MAIN: 'main',
    SAUCE: 'sauce'
}
export function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    return (
        <section className={burgerIngredientsStyles.wrapper}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <nav className={burgerIngredientsStyles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <div className={burgerIngredientsStyles.ingredients}>
                <section className={burgerIngredientsStyles.section}>
                    <h2 className={burgerIngredientsStyles.sectionTitle}>Булки</h2>
                    <div className={burgerIngredientsStyles.cards}>
                        {data.filter(item => item.type === INGREDIENTS_TYPES.BUN).map(item => {
                            if (item._id === '60666c42cc7b410027a1a9b1') {
                                item.count = 1;
                            }
                            return <IngredientCard key={item._id} price={item.price} image={item.image} name={item.name} count={item.count}/>
                        })}
                    </div>
                </section>

                <section className={burgerIngredientsStyles.section}>
                    <h2 className={burgerIngredientsStyles.sectionTitle}>Соусы</h2>
                    <div className={burgerIngredientsStyles.cards}>
                        {data.filter(item => item.type === INGREDIENTS_TYPES.SAUCE).map(item => {
                            if (item._id === '60666c42cc7b410027a1a9b8') {
                                item.count = 10;
                            }
                            return <IngredientCard key={item._id} price={item.price} image={item.image} name={item.name} count={item.count}/>
                        })}
                    </div>
                </section>

                <section className={burgerIngredientsStyles.section}>
                    <h2 className={burgerIngredientsStyles.sectionTitle}>Начинки</h2>
                    <div className={burgerIngredientsStyles.cards}>
                        {data.filter(item => item.type === INGREDIENTS_TYPES.MAIN).map(item => {
                            return <IngredientCard key={item._id} price={item.price} image={item.image} name={item.name}/>
                        })}
                    </div>
                </section>

            </div>

        </section>
    )
}
