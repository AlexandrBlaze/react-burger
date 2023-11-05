import styles from './IngredientsDetails.module.css'
import {
    IngredientDetails
} from "../../components/BurgerIngredients/IngredientCard/modals/IngredientDetails/IngredientDetails";
import React from "react";


export default function OrderDetailPage() {
    return (
        <div className={styles.wrapper}>
            <IngredientDetails/>
        </div>
    )
}