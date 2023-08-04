import ingredientCardStyles from './IngredientCard.module.css'
import PropTypes from "prop-types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    count: PropTypes.number
}

export function IngredientCard({name, price, image, count}) {
    return (
        <section className={ingredientCardStyles.card}>
           <div className={ingredientCardStyles.inner}>
               {count && <Counter count={count} size="default" extraClass="m-1" />}
               <img className={ingredientCardStyles.preview} src={image} alt={name}/>
               <div className={`${ingredientCardStyles.price} pt-1 pb-1 text_type_digits-default`}>
                   <span className="mr-2">{price} </span><CurrencyIcon type="primary" />
               </div>
               <div className={`${ingredientCardStyles.name} text text_type_main-default`}>
                   {name}
               </div>
           </div>
        </section>
    )
}


