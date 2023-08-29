import React, {useCallback, useEffect, useMemo} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css"
import {IngredientsSection} from "./IngridientsSection/IngridientsSection";
import {useSelector} from "react-redux";


export const INGREDIENTS_TYPES = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main',
}

export const INGREDIENTS_NUMBER_TYPES = {
    0: 'bun',
    1: 'sauce',
    2: 'main'
}

export function BurgerIngredients() {
    const [tab, setTab] = React.useState(INGREDIENTS_TYPES.BUN);

    const ingredientItems = useSelector(store => store.ingredients.ingredientItems);


    const scrollContainerRef = React.useRef(null);
    const bunRef = React.useRef();
    const sauceRef = React.useRef();
    const mainRef = React.useRef();

    const sections = [bunRef,sauceRef, mainRef];



    useEffect(() => {
        const scroll = scrollContainerRef.current;
         const handleScroll = () => {
            const observerCallback = (entries) => {
                entries.forEach((elem, index) => {
                    if (elem.isIntersecting) {
                        setTab(INGREDIENTS_NUMBER_TYPES[index]);
                    }
                })
            }

            const observer = new IntersectionObserver(observerCallback, {
                threshold: [0.4, 0.6, 1]
            });


            sections.forEach(item => {
                observer.observe(item.current);
            })
        }
        scroll.addEventListener('scroll', handleScroll)
        return () => {
             if (scroll) {
                 scroll.removeEventListener('scroll', handleScroll)
             }
        }
    }, [sections])

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
    }, [setTab]);

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
            <div className={burgerIngredientsStyles.ingredients} ref={scrollContainerRef}>
                <IngredientsSection ref={bunRef} sectionItems={bunItems} name={'Булки'} />
                <IngredientsSection ref={sauceRef} sectionItems={sauceItems} name={'Соусы'}/>
                <IngredientsSection ref={mainRef} sectionItems={mainItems} name={'Начинка'}/>
            </div>
        </section>
    )
}
