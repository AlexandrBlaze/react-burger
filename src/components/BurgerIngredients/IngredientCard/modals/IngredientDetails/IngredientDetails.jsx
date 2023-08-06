import ingredientDetailsStyles from './IngredientDetails.module.css'
export function IngredientDetails({image, name, calories, proteins, fat, carbohydrates}) {
    return (
        <section className={ingredientDetailsStyles.card}>
            <img className={ingredientDetailsStyles.preview} src={image} alt={name}/>
            <div className={`${ingredientDetailsStyles.name} text text_type_main-medium`}>{name}</div>
            <div className={ingredientDetailsStyles.params}>
                <div className={ingredientDetailsStyles.param}>
                    <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Калории,ккал</div>
                    <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{calories}</div>
                </div>
                <div className={ingredientDetailsStyles.param}>
                    <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Белки, г</div>
                    <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{proteins}</div>
                </div>
                <div className={ingredientDetailsStyles.param}>
                    <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Жиры, г</div>
                    <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{fat}</div>
                </div>
                <div className={ingredientDetailsStyles.param}>
                    <div className={`${ingredientDetailsStyles.paramName} text text_type_main-default text_color_inactive`}>Углеводы, г</div>
                    <div className={`${ingredientDetailsStyles.paramValue} text text_type_digits-default text_color_inactive`}>{carbohydrates}</div>
                </div>
            </div>
        </section>
    )
}
