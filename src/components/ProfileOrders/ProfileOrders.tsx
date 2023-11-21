import {useEffect} from "react";
import {ORDER_WS_URL} from "../../ApiUlrs/apiUrls";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ORDER_WS_CONNECTION_CLOSED, ORDER_WS_CONNECTION_START} from "../../services/actions/orderWsActions";
import {OrderCard} from "../../pages/Feed/OrderCard/OrderCard";
import {IFeedItem} from "../../services/reducers/feedReducer/feedReducer";


export  default function ProfileOrders() {
    const userIsAuth = useAppSelector(state =>  state.authData.is_auth);
    const orders = useAppSelector(state => state.userOrdersData.orders)
    const wsIsOpen = useAppSelector(state => state.userOrdersData.isOpen)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userIsAuth) {
            dispatch({type: ORDER_WS_CONNECTION_START, url: ORDER_WS_URL })
        }
        return() => {
            dispatch({type: ORDER_WS_CONNECTION_CLOSED})
        }
    }, [dispatch, userIsAuth]);
    return (
        <div>
            {wsIsOpen && orders.length ?
                orders.map((item: IFeedItem) => {
                    return <OrderCard key={item._id} {...item}/>
                })
                : 'Заказы отсутствуют'
            }
        </div>
    )
}
