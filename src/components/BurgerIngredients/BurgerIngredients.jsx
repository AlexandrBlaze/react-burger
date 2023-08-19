import React, {useContext, useMemo} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css"
import PropTypes, {shape} from "prop-types";
import {IngredientsSection} from "./IngridientsSection/IngridientsSection";
import {ingredientItem} from "../../constants/ingredientItem";
import {IngredientsContext} from "../../contexts/ingredientsContext";


export const INGREDIENTS_TYPES = {
    BUN: 'bun',
    MAIN: 'main',
    SAUCE: 'sauce'
}

BurgerIngredients.propTypes = {
    ingredientItems: PropTypes.arrayOf(shape(ingredientItem))
}

export function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');

    const ingredientItems = useContext(IngredientsContext);

    // Формируем массив с булками
    const bunItems = useMemo(() => {
        return  ingredientItems.filter(item => {
            if (item._id === '643d69a5c3f7b9001cfa093c') {
                item.count = 1;
            }
            return item.type === INGREDIENTS_TYPES.BUN
        });
    }, [ingredientItems]);

    // Формируем массив с соусами
    const sauceItems = useMemo(() => {
        return  ingredientItems.filter(item => item.type === INGREDIENTS_TYPES.SAUCE);
    }, [ingredientItems]);

    // Формируем массив с Начинками
    const mainItems = useMemo(() => {
        return  ingredientItems.filter(item => item.type === INGREDIENTS_TYPES.MAIN);
    }, [ingredientItems]);


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
