import ingredientSectionStyles from './IngridientsSection.module.css'
import {IngredientCard} from "../IngredientCard/IngredientCard";
import {forwardRef} from "react";
import {IIngredientItem} from "../../../services/reducers/ingredientsReducer/ingredientsReducer";


interface Props {
    sectionItems: IIngredientItem[],
    name: string
}
export type Ref = HTMLElement;
export const IngredientsSection = forwardRef<Ref, Props>((props , ref) => {
    return (
        <section className={ingredientSectionStyles.section} ref={ref}>
            <h2 className={ingredientSectionStyles.sectionTitle}>{props.name}</h2>
            <div className={ingredientSectionStyles.cards} data-cy="ingredients">
                {props.sectionItems.map((item: IIngredientItem) => {
                    return <IngredientCard key={item._id} {...item}/>
                })}
            </div>
        </section>
    )
});
