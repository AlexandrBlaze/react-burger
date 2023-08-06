import React, {useCallback} from "react";
import ingredientCardStyles from './IngredientCard.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../../Modal/Modal";
import {IngredientDetails} from "./modals/IngredientDetails/IngredientDetails";
import {ingredientItem} from "../../../constants/ingredientItem";

IngredientCard.propTypes = ingredientItem;
export function IngredientCard(props) {

    const [modalVisible, setVisible] = React.useState(false)

    const toggleModal = useCallback(() => {
        setVisible(!modalVisible)
    }, [modalVisible])

    return (
        <>
            <section onClick={toggleModal} className={ingredientCardStyles.card}>
                <div className={ingredientCardStyles.inner}>
                    {props.count && <Counter count={props.count} size="default" extraClass="m-1" />}
                    <img className={ingredientCardStyles.preview} src={props.image} alt={props.name}/>
                    <div className={`${ingredientCardStyles.price} pt-1 pb-1 text_type_digits-default`}>
                        <span className="mr-2">{props.price} </span><CurrencyIcon type="primary" />
                    </div>
                    <div className={`${ingredientCardStyles.name} text text_type_main-default`}>
                        {props.name}
                    </div>
                </div>

            </section>
            {modalVisible &&
                <Modal modalTitle={'Детали ингредиента'} toggleModal={toggleModal}>
                    <IngredientDetails image={props.image}
                                       name={props.name}
                                       calories={props.calories}
                                       proteins={props.proteins}
                                       fat={props.fat}
                                       carbohydrates={props.carbohydrates}/>
                </Modal>
            }
        </>



    )
}

