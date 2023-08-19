import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from  './BurgerConstructor.module.css'
import {INGREDIENTS_TYPES} from "../BurgerIngredients/BurgerIngredients";
import {Modal} from "../Modal/Modal";
import React, {useCallback, useContext, useEffect, useMemo} from "react";
import {OrderDetails} from "./modals/OrderDetails/OrderDetails";
import PropTypes, {func, shape} from "prop-types";
import {ingredientItem} from "../../constants/ingredientItem";
import {IngredientsContext} from "../../contexts/ingredientsContext";


BurgerConstructor.propTypes = {
    ingredientItems: PropTypes.arrayOf(shape(ingredientItem))
}

const create_order_url = 'https://norma.nomoreparties.space/api/orders';

export function BurgerConstructor() {

    const [modalVisible, setVisible] = React.useState(false)
    const [selectedBun, setSelectedBun] = React.useState(null)
    const [ingredients, setIngredients] = React.useState([])
    const [orderParams, setOrderParams] = React.useState({
        orderNumber: 0,
        name: "",
    })

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


    const createOrder = () => {
        const orderIds = ingredients.map(item => item._id);

        fetch(create_order_url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ingredients: orderIds})
        }).then((res) => {
            return res.ok ? res : new Error("Ошибка в response");
        }).then(function (response) {
            return response.json();
        }).then(function (result) {
            setOrder(result);
        }).catch (function (error) {
            console.log('Request failed', error);
        });
    }

    function setOrder(data) {
        setOrderParams({
            orderNumber: data.order.number,
            name: data.name,
        })
        toggleModal();
    }

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
                    Оформить заказ
                </Button>
                {modalVisible &&
                    <Modal toggleModal={toggleModal}>
                       <OrderDetails orderData={orderParams} />
                    </Modal>
                }
            </div>
        </section>

    )
}
