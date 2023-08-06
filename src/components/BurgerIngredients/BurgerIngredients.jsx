import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css"
import {IngredientCard} from "./IngredientCard/IngredientCard";
import PropTypes, {shape} from "prop-types";
import {IngredientsSection} from "./IngridientsSection/IngridientsSection";


export const INGREDIENTS_TYPES = {
    BUN: 'bun',
    MAIN: 'main',
    SAUCE: 'sauce'
}
export const ingredientItem = {
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    _id: PropTypes.string,
    __v: PropTypes.number,
}

BurgerIngredients.propTypes = {
    ingredientItems: PropTypes.arrayOf(shape(ingredientItem))
}

export function BurgerIngredients({ingredientItems}) {
    const [current, setCurrent] = React.useState('one');
    console.log(ingredientItems)
    // Формируем массив с булками
    const bunItems = ingredientItems.filter(item => {
        if (item._id === '643d69a5c3f7b9001cfa093c') {
            item.count = 1;
        }
        return item.type === INGREDIENTS_TYPES.BUN
    });

    // Формируем массив с соусами
    const sauceItems = ingredientItems.filter(item => {
        return item.type === INGREDIENTS_TYPES.SAUCE
    });

    // Формируем массив с Начинками
    const mainItems = ingredientItems.filter(item => {
        return item.type === INGREDIENTS_TYPES.MAIN
    });


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
                <IngredientsSection sectionItems={bunItems} />
                <IngredientsSection sectionItems={sauceItems} />
                <IngredientsSection sectionItems={mainItems} />
            </div>

        </section>
    )
}
