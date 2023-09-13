import React, {useCallback, useMemo} from "react";
import ingredientCardStyles from './IngredientCard.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientItem} from "../../../constants/ingredientItem";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {showInfoModal} from "../../../services/actions/showInfoModalAction";
import {Link, useLocation} from "react-router-dom";

IngredientCard.propTypes = ingredientItem;

export function IngredientCard(props) {
    const location = useLocation();

    const ingredientId = props._id;

    const dispatch = useDispatch();
    const modalParams = {
        image: props.image,
        name: props.name,
        calories: props.calories,
        proteins: props.proteins,
        fat: props.fat,
        carbohydrates: props.carbohydrates,
    }

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredients',
        item: props,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    const constructorItems = useSelector(state => state.ingredientsConstructor.items)
    const bunItem = useSelector(state => state.ingredientsConstructor.bun);

    const bunCounter = useMemo(() => {
        if (bunItem?._id === props._id) {
            return 2;
        }
    }, [bunItem?._id, props._id]);

    const getCount = useMemo(() => {
        return constructorItems.filter((element) => element._id === props._id);
    }, [constructorItems, props._id]);

    const counter = getCount.length;


    const toggleModal = useCallback(() => {
        dispatch(showInfoModal(modalParams))
    }, [dispatch])

    return (
        <> {!isDrag &&
            <Link onClick={toggleModal}
                  ref={dragRef}
                  key={ingredientId}
                  to={`/ingredients/${ingredientId}`}
                  state={{ background: location }}
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
            </Link>

            }
        </>
    )
}

