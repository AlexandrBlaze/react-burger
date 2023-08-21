import React, {forwardRef, useCallback, useContext, useEffect, useMemo} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css"
import PropTypes, {shape} from "prop-types";
import {IngredientsSection} from "./IngridientsSection/IngridientsSection";
import {ingredientItem} from "../../constants/ingredientItem";
import {IngredientsContext} from "../../contexts/ingredientsContext";
import {render} from "react-dom";


export const INGREDIENTS_TYPES = {
    BUN: 'bun',
    MAIN: 'main',
    SAUCE: 'sauce'
}

BurgerIngredients.propTypes = {
    ingredientItems: PropTypes.arrayOf(shape(ingredientItem))
}

export function BurgerIngredients() {
    const [tab, setTab] = React.useState(INGREDIENTS_TYPES.BUN);

    const ingredientItems = useContext(IngredientsContext);
    const bunRef = React.useRef();
    const sauceRef = React.useRef();
    const mainRef = React.useRef();

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

    const scrollIntoSection = useCallback((name) => {
        console.log(name);
        setTab(name);
        if (name === INGREDIENTS_TYPES.BUN) {
            bunRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (name === INGREDIENTS_TYPES.SAUCE) {
            sauceRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (name === INGREDIENTS_TYPES.MAIN) {
            mainRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [setTab, tab]);

    return (
        <section className={burgerIngredientsStyles.wrapper}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <nav className={burgerIngredientsStyles.tabs}>
                <Tab value={INGREDIENTS_TYPES.BUN}
                     active={tab === INGREDIENTS_TYPES.BUN}
                     onClick={scrollIntoSection}>
                    Булки
                </Tab>
                <Tab value={INGREDIENTS_TYPES.SAUCE}
                     active={tab === INGREDIENTS_TYPES.SAUCE}
                     onClick={scrollIntoSection}>
                    Соусы
                </Tab>
                <Tab value={INGREDIENTS_TYPES.MAIN}
                     active={tab === INGREDIENTS_TYPES.MAIN}
                     onClick={scrollIntoSection}>
                    Начинки
                </Tab>
            </nav>
            <div className={burgerIngredientsStyles.ingredients}>
                <IngredientsSection ref={bunRef} sectionItems={bunItems} />
                <IngredientsSection ref={sauceRef} sectionItems={sauceItems} />
                <IngredientsSection ref={mainRef} sectionItems={mainItems} />
            </div>
        </section>
    )
}
