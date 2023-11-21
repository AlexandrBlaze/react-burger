import React, {useCallback, useEffect, useMemo} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css"
import {IngredientsSection} from "./IngridientsSection/IngridientsSection";
import {useAppSelector} from "../../hooks";


export const INGREDIENTS_TYPES: Record<string, string> = {
    BUN: 'bun',
    SAUCE: 'sauce',
    MAIN: 'main',
}

export const INGREDIENTS_NUMBER_TYPES: Record<number, string> = {
    0: 'bun',
    1: 'sauce',
    2: 'main'
}

type IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
) => void;

interface IntersectionObserverEntry {
    readonly target: Element;
    readonly boundingClientRect: DOMRectReadOnly;
    readonly intersectionRect: DOMRectReadOnly;
    readonly intersectionRatio: number;
    readonly isIntersecting: boolean;
    readonly time: number;
}

export function BurgerIngredients() {
    const [tab, setTab] = React.useState<number | string>(INGREDIENTS_TYPES.BUN);

    const ingredientItems = useAppSelector(store => store.ingredients.ingredientItems);


    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const bunRef = React.useRef<HTMLElement>(null);
    const sauceRef = React.useRef<HTMLElement>(null);
    const mainRef = React.useRef<HTMLElement>(null);

    useEffect(() => {
        const sections = [bunRef,sauceRef, mainRef];
        const scroll = scrollContainerRef.current;
         const handleScroll = () => {
            const observerCallback: IntersectionObserverCallback = (entries) => {
                entries.forEach((elem: IntersectionObserverEntry, index) => {
                    if (elem.isIntersecting) {
                        setTab(INGREDIENTS_NUMBER_TYPES[index]);
                    }
                })
            }

            const observer = new IntersectionObserver(observerCallback, {
                threshold: [0.4, 0.6, 1]
            });


            sections.forEach((item) => {
                if (item.current) {
                    return observer.observe(item.current);
                }
            })
        }
        if (scroll) {
            scroll.addEventListener('scroll', handleScroll)
        }
        return () => {
             if (scroll) {
                 scroll.removeEventListener('scroll', handleScroll)
             }
        }
    }, [])

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
        return  ingredientItems.filter((item) => item.type === INGREDIENTS_TYPES.SAUCE);
    }, [ingredientItems]);

    // Формируем массив с Начинками
    const mainItems = useMemo(() => {
        return  ingredientItems.filter(item => item.type === INGREDIENTS_TYPES.MAIN);
    }, [ingredientItems]);

    const scrollIntoSection = useCallback((name: React.SetStateAction<string | number>) => {
        setTab(name);
        if (name === INGREDIENTS_TYPES.BUN && bunRef.current) {
            bunRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (name === INGREDIENTS_TYPES.SAUCE && sauceRef.current) {
            sauceRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (name === INGREDIENTS_TYPES.MAIN && mainRef.current) {
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
            <div className={burgerIngredientsStyles.ingredients} ref={scrollContainerRef} >
                <IngredientsSection ref={bunRef} sectionItems={bunItems} name={'Булки'} />
                <IngredientsSection ref={sauceRef} sectionItems={sauceItems} name={'Соусы'}/>
                <IngredientsSection ref={mainRef} sectionItems={mainItems} name={'Начинка'}/>
            </div>
        </section>
    )
}
