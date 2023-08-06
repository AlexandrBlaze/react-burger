import React, {useCallback} from "react";
import ingredientCardStyles from './IngredientCard.module.css'
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../../Modal/Modal";
import {IngredientDetails} from "./modals/IngredientDetails/IngredientDetails";

IngredientCard.propTypes = {
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

