import styles from './DetailedOrderCard.module.css'
import {useParams} from "react-router-dom";
import React, {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {GET_ORDER_BY_ID_RESET, getOrderById} from "../../services/actions/detailedOrderCardActions";
import Loader from "../Loader/Loader";
import {IIngredientItem} from "../../services/reducers/ingredientsReducer";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IFeedItem} from "../../services/reducers/feedReducer";


export default function DetailedOrderCard() {
    const {number}  = useParams();
    const dispatch = useAppDispatch();
    const order = useAppSelector(state => state.detailedOrderData.order);
    const ingredients = useAppSelector(state => state.ingredients.ingredientItems);
    const loader = useAppSelector(state => state.detailedOrderData.loader);

    const ingredientsListObj = useMemo(() => {
        const obj: Record<string, IIngredientItem> = {}
        ingredients.forEach(ingredient =>  {
            obj[ingredient._id] = ingredient;
        })
        return obj
    }, [ingredients])

    const result = useMemo(() => {
        const obj:  Record<string, number> = {}
        if (order.ingredients) {
            for (const id of order.ingredients) {
                if (!obj[id]) {
                    obj[id] = 0
                }
                obj[id]++
            }
        }
        return obj;
    },[order.ingredients])

    const resultArray = Object.entries(result);

    const totalPrice = useMemo(() => {
        return Object.entries(result).reduce((accumulator, [key, value]) => accumulator + ingredientsListObj[key].price, 0);
    }, [ingredientsListObj, result])

    useEffect(() => {
        if (number) {
            dispatch(getOrderById(number))
        }
        return() => {
            dispatch({type: GET_ORDER_BY_ID_RESET})
        }
    }, [dispatch, number]);

    return(
        <div className={styles.cardWrapper}>
            {loader && <Loader/>}
            <div className={`${styles.cardNumber} text text_type_digits-default mb-10`}>#{order.number}</div>
            <div className={`${styles.cardTitle} text text_type_main-medium`}>{order.name}</div>
            <div className={`${styles.cardStatus}`}>Выполнен</div>
            <div className="text text_type_main-medium mb-6">Состав:</div>
            <div className={styles.ingredients}>
                {resultArray.map(([key, value]) => {
                    return <div key={key} className={styles.ingredientItem}>
                        <div className={styles.ingredientItemPreview}>
                            <img src={ingredientsListObj[key].image} alt=""/>
                        </div>
                        <div className={styles.ingredientItemName}>
                            {ingredientsListObj[key].name}
                        </div>
                        <div className={`${styles.ingredientItemPrice} text text_type_digits-default`}>
                            {value} x {ingredientsListObj[key].price * value}
                        </div>
                        <CurrencyIcon type="primary" />
                    </div>
                })}
            </div>
            <div className={styles.footer}>
                {order.createdAt && <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)}/>}
                <span className="text text_type_digits-default d-flex ai-center">
                    <span className="mr-2">{totalPrice}</span> <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    )
}