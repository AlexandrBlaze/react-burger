import orderDetailsStyles from './OrderDetails.module.css'
import doneImage from '../../../../images/graphics.svg'

interface Props {
    orderNumber: number
}
export function OrderDetails(props: Props) {
    return (
        <section className={orderDetailsStyles.info}>
            <div className={`${orderDetailsStyles.orderNumber} text text_type_digits-large`}>{props.orderNumber}</div>
            <div className={`${orderDetailsStyles.orderNumberTitle} text text_type_main-medium`}>идентификатор заказа</div>
            <div className={`${orderDetailsStyles.done} text text_type_main-medium`}>
                <img src={doneImage} alt="done!"/>
            </div>
            <div className={`${orderDetailsStyles.inProgress} text text_type_main-default`}>Ваш заказ начали готовить</div>
            <div className={`${orderDetailsStyles.infoMessage} text text_color_inactive`}>Дождитесь готовности на орбитальной станции</div>
        </section>
    )
}
