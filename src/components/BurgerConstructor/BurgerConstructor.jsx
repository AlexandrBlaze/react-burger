import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from  './BurgerConstructor.module.css'
import {INGREDIENTS_TYPES} from "../BurgerIngredients/BurgerIngredients";
import {Modal} from "../Modal/Modal";
import React, {useCallback, useContext, useEffect, useMemo} from "react";
import {OrderDetails} from "./modals/OrderDetails/OrderDetails";
import PropTypes, {func, shape} from "prop-types";
import {ingredientItem} from "../../constants/ingredientItem";
import {IngredientsContext} from "../../contexts/ingredientsContext";
import request from "../../utils/requestHelper";


BurgerConstructor.propTypes = {
    ingredientItems: PropTypes.arrayOf(shape(ingredientItem))
}

export function BurgerConstructor() {

    const [modalVisible, setVisible] = React.useState(false)
    const [selectedBun, setSelectedBun] = React.useState(null)
    const [ingredients, setIngredients] = React.useState([])
    const [orderParams, setOrderParams] = React.useState({
        orderNumber: null,
        name: "",
    })
    const [orderLoader, setOrderLoader] = React.useState(false)
    const [orderError, setOrderError] = React.useState(false)

    const constructorItems = useContext(IngredientsContext);

    const toggleModal = useCallback(() => {
        setVisible(!modalVisible)
    }, [modalVisible])


    useEffect(() => {
        setSelectedBun(constructorItems.find(item => item._id === '643d69a5c3f7b9001cfa093c'))
        setIngredients(constructorItems.filter(item => item.type !== INGREDIENTS_TYPES.BUN))
    }, [constructorItems])

    // общая сумма
    const calculateCost = useMemo(() => {
        let totalCost;
        let totalCostIngredients = ingredients.reduce((acc, curr) => {
            return  acc + curr.price
        }, 0);
        return totalCost = totalCostIngredients + ((selectedBun?.price || 0) * 2);
    }, [ingredients, selectedBun])


    const createOrder = async () => {
        try {
            setOrderLoader(true)
            const orderIds = ingredients.map(item => item._id);

            const res = await request('orders', {
                method: 'POST',
                headers: {'Content-type': 'application/json; charset=UTF-8',},
                body: JSON.stringify({
                    ingredients: orderIds
                })
            })
            const data = await res.json()
            setOrderParams({orderNumber: data.order.number, name: data.name})
            setOrderLoader(false)

        } catch (error) {
            setOrderLoader(false);
            setOrderError(true);
            console.log(error)
        }
    }

    useEffect(() => {
        if (orderParams.orderNumber) {
            toggleModal();
        }
    }, [orderParams])

    return (
        <section className={burgerConstructorStyles.wrapper}>
            { selectedBun &&
            <div className={`${burgerConstructorStyles.item} pl-8 mb-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={selectedBun.name + ' (верх)'}
                    price={20}
                    thumbnail={selectedBun.image}
                />
            </div>
            }

            <div className={burgerConstructorStyles.scrollContainer}>
                {ingredients.map((item) => {
                    return (
                        <div key={item._id} className={burgerConstructorStyles.item}>
                            <span className="mr-2">
                                <DragIcon type="primary" />
                            </span>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </div>
                    )
                })}

            </div>
            {selectedBun &&
            <div className={`${burgerConstructorStyles.item} pl-8 mt-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={selectedBun.name + ' (низ)'}
                    price={20}
                    thumbnail={selectedBun.image}
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
                    {!orderLoader && <span> Оформить заказ</span>}
                </Button>
                {modalVisible &&
                    <Modal toggleModal={toggleModal}>
                       <OrderDetails orderNumber={orderParams.orderNumber} />
                    </Modal>
                }
            </div>
        </section>

    )
}
