import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from  './BurgerConstructor.module.css'
import {INGREDIENTS_TYPES} from "../BurgerIngredients/BurgerIngredients";
import {Modal} from "../Modal/Modal";
import React, {useCallback, useEffect, useMemo} from "react";
import {OrderDetails} from "./modals/OrderDetails/OrderDetails";
import {getCreateOrder, ORDER_MODAL_CLOSE} from "../../services/actions/createOrderActions";
import {useDrop} from "react-dnd";
import {
    INGREDIENT_BUN_ITEM_ADD,
    INGREDIENT_ITEM_ADD,
    removeItem
} from "../../services/actions/burgerConstructorActions";
import {BurgerConstructorItem} from "./burgerConstructorItem/BurgerConstructorItem";
import {nanoid} from "nanoid";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../App/hooks";
import {IIngredientItem} from "../../services/reducers/ingredientsReducer";

export function BurgerConstructor() {
    const [ingredients, setIngredients] = React.useState<IIngredientItem[]>([])
    const dispatch = useAppDispatch();
    const constructorItems = useAppSelector(store => store.ingredientsConstructor.items);
    const constructorBun = useAppSelector(store => store.ingredientsConstructor.bun);
    const orderData = useAppSelector(state => state.orderInfo.orderData);
    const orderLoader = useAppSelector(state => state.orderInfo.loader)
    const orderError = useAppSelector(store => store.orderInfo.error);
    const orderModalVisible = useAppSelector(state => state.orderInfo.orderModalVisible);
    const isAuth = useAppSelector(state => state.authData.is_auth);
    const navigate = useNavigate();

    const createOrder = useCallback(() => {
        if (!isAuth) {
            navigate('/login');
            return
        }
        dispatch(getCreateOrder())
    }, [dispatch, isAuth, navigate])

    useEffect(() => {
        return setIngredients(constructorItems.filter(item => item.type !== INGREDIENTS_TYPES.BUN));
    }, [constructorItems])

    // общая сумма
    const calculateCost = useMemo(() => {
        let totalCostIngredients = ingredients.reduce((acc, curr: IIngredientItem) => {
            return  acc + curr.price
        }, 0);
        return totalCostIngredients + ((constructorBun?.price || 0) * 2);
    }, [ingredients, constructorBun])

    const [, dropTarget] = useDrop({
        accept: 'ingredients',
        drop(item: IIngredientItem) {
            if (item.type === 'bun') {
                dispatch({
                    type: INGREDIENT_BUN_ITEM_ADD,
                    payload: {...item},
                })
            } else {
                dispatch({
                    type: INGREDIENT_ITEM_ADD,
                    payload: [...constructorItems, {...item, uniqueId: nanoid()}],
                })
            }
        }
    })


    const deleteItem = (index: number) => {
        dispatch(removeItem(index));
    }

    function closeOrderModal() {
        dispatch({type: ORDER_MODAL_CLOSE})
    }

    return (
        <section className={burgerConstructorStyles.wrapper} ref={dropTarget}>
            { constructorBun &&
            <div className={`${burgerConstructorStyles.item} pl-8 mb-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={constructorBun.name + ' (верх)'}
                    price={constructorBun.price}
                    thumbnail={constructorBun.image}
                />
            </div>
            }

            <div className={burgerConstructorStyles.scrollContainer}>
                {ingredients.map((item, index) => {
                    return (
                        <React.Fragment key={item.uniqueId} >
                            <BurgerConstructorItem index={index}
                                                   ingredientItem={item}
                                                   deleteItem={deleteItem}/>
                        </React.Fragment>
                    )
                })}

            </div>

            {constructorBun &&
            <div className={`${burgerConstructorStyles.item} pl-8 mt-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={constructorBun.name + ' (низ)'}
                    price={constructorBun.price}
                    thumbnail={constructorBun.image}
                />
            </div>
            }

            <div className={burgerConstructorStyles.footer}>
                <div className={burgerConstructorStyles.total}>
                    <span className="text text_type_digits-medium mr-1">{calculateCost}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={createOrder} htmlType="button" type="primary" size="large">
                    {orderLoader && <span>Загрузка</span>}
                    {orderError && <span>Ошибка</span>}
                    {(!orderLoader && !orderError) && <span> Оформить заказ</span>}
                </Button>
                {orderModalVisible &&
                    <Modal toggleModal={closeOrderModal}>
                        <OrderDetails orderNumber={orderData.orderNumber} />
                    </Modal>
                }
            </div>
        </section>

    )
}
