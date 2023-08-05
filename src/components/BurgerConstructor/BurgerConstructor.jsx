import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from  './BurgerConstructor.module.css'
import {data} from "../../utils/data";
import {INGREDIENTS_TYPES} from "../BurgerIngredients/BurgerIngredients";


export function BurgerConstructor() {
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
                {data.filter(item => item.type !== INGREDIENTS_TYPES.BUN).map((item) => {
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
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>

    )
}
