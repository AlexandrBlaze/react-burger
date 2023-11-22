import ingredientDetailsStyles from './IngredientDetails.module.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../../../../hooks";
import {IIngredientItem} from "../../../../../services/reducers/ingredientsReducer/ingredientsReducer";

export function IngredientDetails() {
    const { ingredientId } = useParams();
    const [ingredient, setIngredient] = useState<IIngredientItem>();
    const ingredientItems = useAppSelector(store => store.ingredients.ingredientItems);

    const ingredientInfo = ingredientItems.find(item => item._id === ingredientId)

    useEffect(() => {
        if (ingredientItems.length) {
            setIngredient(ingredientInfo)
        }

    },[ingredientInfo, ingredientItems.length])
    return (
        <>
            {ingredient &&
                <section className={ingredientDetailsStyles.card}>
                    <img className={ingredientDetailsStyles.preview} src={ingredient.image} alt={ingredient.name}/>
                    <div className={`${ingredientDetailsStyles.name} text text_type_main-medium`}  data-cy="modal-ingredient-name">{ingredient.name}</div>
                    <div className={ingredientDetailsStyles.params}>
                        <div className={ingredientDetailsStyles.param}>
                            <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Калории,ккал</div>
                            <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</div>
                        </div>
                        <div className={ingredientDetailsStyles.param}>
                            <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Белки, г</div>
                            <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</div>
                        </div>
                        <div className={ingredientDetailsStyles.param}>
                            <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Жиры, г</div>
                            <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</div>
                        </div>
                        <div className={ingredientDetailsStyles.param}>
                            <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Углеводы, г</div>
                            <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</div>
                        </div>
                    </div>
                </section>
            }
            </>

    )
}
