import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from  './BurgerConstructor.module.css'
import {INGREDIENTS_TYPES} from "../BurgerIngredients/BurgerIngredients";
import {Modal} from "../Modal/Modal";
import React, {useCallback} from "react";
import {OrderDetails} from "./modals/OrderDetails/OrderDetails";
import PropTypes, {shape} from "prop-types";

export const constructorItem = {
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

BurgerConstructor.propTypes = {
    ingredientItems: PropTypes.arrayOf(shape(constructorItem))
}

export function BurgerConstructor({constructorItems}) {

    const [modalVisible, setVisible] = React.useState(false)

    const toggleModal = useCallback(() => {
        setVisible(!modalVisible)
    }, [modalVisible])


    const ingredients = constructorItems.filter(item => item.type !== INGREDIENTS_TYPES.BUN)
    return (
        <section className={burgerConstructorStyles.wrapper}>
            <div className={`${burgerConstructorStyles.item} pl-8 mb-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={20}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>

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

            <div className={`${burgerConstructorStyles.item} pl-8 mt-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={20}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>

            <div className={burgerConstructorStyles.footer}>
                <div className={burgerConstructorStyles.total}>
                    <span className="text text_type_digits-medium mr-1">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={toggleModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
                {modalVisible &&
                    <Modal toggleModal={toggleModal}>
                       <OrderDetails/>
                    </Modal>
                }
            </div>
        </section>

    )
}
