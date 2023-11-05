import orderCardStyles from './OrderCard.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../../hooks";
import {IIngredientItem} from "../../../services/reducers/ingredientsReducer";
import {IFeedItem} from "../../../services/reducers/feedReducer";
import {Link, useLocation} from "react-router-dom";

const statusTypes= {
    done: 'Создан',
    pending: 'Готовится',
    created: 'Выполнен'
}
export function OrderCard(props: IFeedItem, cardType: string) {

    const location = useLocation();
    const baseIngredients = useAppSelector(state => state.ingredients.ingredientItems)
    // Выборка из базы ингредиентов по списку id из заказа (приходят только Id)
    const compound: IIngredientItem[] = baseIngredients.filter((ingredient) => props.ingredients.includes(ingredient._id));
    // Элементы для вывода в карточку, если больше 6 то обрезать, если нет то вывести полный список
    const compoundWithRender = compound.slice(0, props.ingredients.length > 5 ? 6 : props.ingredients.length)
    // общая стоимость бургера с учетом price всех ингредиентов
    const totalPrice = compound.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    // Выводим кол-во недостающих элементов при отображении в последнем элементе
    const moreItems: Array<string> =  props.ingredients.slice(6);

    return(
        <Link  to={`${location.pathname}/${props.number}`}
               state={{ background: location }} className={orderCardStyles.orderCard}>
            <div className={orderCardStyles.header}>
                <div className={orderCardStyles.id}>#{props.number}</div>
                <div className={orderCardStyles.date}><FormattedDate date={new Date(props.createdAt)} /></div>
            </div>
            <div className={orderCardStyles.title}>{props.name}</div>
            <div className={`${orderCardStyles.status} ${props.status === 'created' ? orderCardStyles.created : ''}`}>
                {statusTypes[props.status]}
            </div>
            <div className={orderCardStyles.footer}>
                <div className={orderCardStyles.compound}>
                    {compoundWithRender.map((item, index) => {
                        return <div key={item._id} className={orderCardStyles.compoundItem}>
                            <img src={item.image_mobile} alt={item.name}/>
                            {index === 0 && props.ingredients.length > 6 &&
                                <div className={orderCardStyles.moreItemsCounter}>
                                    +{moreItems.length}
                                </div>
                            }
                        </div>
                    })}
                </div>
                <div className={orderCardStyles.totalPrice}>
                    <span className="text text_type_digits-default">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}