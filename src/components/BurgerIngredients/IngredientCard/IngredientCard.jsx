import React, {useCallback, useMemo} from "react";
import ingredientCardStyles from './IngredientCard.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../../Modal/Modal";
import {IngredientDetails} from "./modals/IngredientDetails/IngredientDetails";
import {ingredientItem} from "../../../constants/ingredientItem";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, OPEN_MODAL} from "../../../services/actions/showInfoModalAction";
import {useDrag} from "react-dnd";

IngredientCard.propTypes = ingredientItem;
export function IngredientCard(props) {
    const dispatch = useDispatch();


    const modalParams = {
        image: props.image,
        name: props.name,
        calories: props.calories,
        proteins: props.proteins,
        fat: props.fat,
        carbohydrates: props.carbohydrates,
    }

    const {modalVisible, modalData} = useSelector(state => ({
        modalVisible: state.modalInfo.modalVisible,
        modalData: state.modalInfo.modalData,
    }))

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredients',
        item: props,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    const {constructorItems, bunItem} = useSelector(state => ({
        constructorItems: state.ingredientsConstructor.items,
        bunItem: state.ingredientsConstructor.bun,
    }));

    const getBunCounter = useMemo(() => {
        if (bunItem?._id === props._id) {
            return 2;
        }
    }, [bunItem])
    const bunCounter = getBunCounter;

    const getCount = useMemo(() => {
        return constructorItems.filter((element) => element._id === props._id);
    }, [constructorItems]);

    const counter = getCount.length;


    const toggleModal = useCallback(() => {
        if (modalVisible) {
            dispatch({type: CLOSE_MODAL})
        } else {
            dispatch({type: OPEN_MODAL, payload: modalParams})
        }


    }, [modalVisible])

    return (
        <> {!isDrag &&
                <section onClick={toggleModal}
                         ref={dragRef}
                         className={ingredientCardStyles.card}>
                    <div className={ingredientCardStyles.inner}>
                        {(bunCounter && props.type === 'bun') && (<Counter count={bunCounter} size="default" extraClass="m-1" />)}
                        {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
                        <img className={ingredientCardStyles.preview} src={props.image} alt={props.name}/>
                        <div className={`${ingredientCardStyles.price} pt-1 pb-1 text_type_digits-default`}>
                            <span className="mr-2">{props.price} </span><CurrencyIcon type="primary" />
                        </div>
                        <div className={`${ingredientCardStyles.name} text text_type_main-default`}>
                            {props.name}
                        </div>
                    </div>

                </section>
            }
            {modalVisible &&
                <Modal modalTitle={'Детали ингредиента'} toggleModal={toggleModal}>
                    <IngredientDetails {...modalData}/>
                </Modal>
            }
        </>
    )
}

