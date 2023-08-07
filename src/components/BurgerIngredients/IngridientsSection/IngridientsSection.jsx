import ingredientSectionStyles from './IngridientsSection.module.css'
import {IngredientCard} from "../IngredientCard/IngredientCard";
import PropTypes, {shape} from "prop-types";
import {ingredientItem} from "../../../constants/ingredientItem";


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

