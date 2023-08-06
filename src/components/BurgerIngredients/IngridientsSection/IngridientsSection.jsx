import ingredientSectionStyles from './IngridientsSection.module.css'
import {IngredientCard} from "../IngredientCard/IngredientCard";
import PropTypes, {shape} from "prop-types";

export const ingredientItem = {
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

IngredientsSection.propTypes = {
    sectionItems: PropTypes.arrayOf(shape(ingredientItem))
}

export function IngredientsSection({sectionItems}) {
    return (
        <section className={ingredientSectionStyles.section}>
            <h2 className={ingredientSectionStyles.sectionTitle}>Булки</h2>
            <div className={ingredientSectionStyles.cards}>
                {sectionItems.map(item => {
                    return <IngredientCard key={item._id} {...item}/>
                })}
            </div>
        </section>
    )
}

