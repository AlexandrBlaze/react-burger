import feedPageStyles from './FeedPage.module.css'
import {OrderCard} from "./OrderCard/OrderCard";
import {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {FEED_WS_CONNECTION_CLOSED, FEED_WS_CONNECTION_START} from "../../services/actions/feedWsActions";
import {FEED_WS_URL} from "../../ApiUlrs/apiUrls";
import {IFeedItem} from "../../services/reducers/feedReducer";

export default function FeedPage() {
    const orders = useAppSelector(state => state.feedData.orders)
    const totalToday = useAppSelector(state => state.feedData.totalToday)
    const total = useAppSelector(state => state.feedData.total)
    const dispatch = useAppDispatch();

    const doneItems = useMemo(() => {
        return orders.filter((item) => item.status === "done");
    }, [orders]);

    const inProgressItems = useMemo(() => {
        return orders.filter((item) => item.status === "pending");
    }, [orders]);

    useEffect(() => {
        dispatch({type: FEED_WS_CONNECTION_START, payload: FEED_WS_URL })
        return() => {
            dispatch({type: FEED_WS_CONNECTION_CLOSED})
        }
    }, [dispatch]);

    return (
        <main className={feedPageStyles.wrapper}>
            <div className={feedPageStyles.content}>
                <div className={feedPageStyles.halfLeft}>
                    <h1 className={`${feedPageStyles.title} text text_type_main-large mb-5`}>Лента заказов</h1>
                    <div className={feedPageStyles.scrollBar}>
                        {orders.map((item: IFeedItem) => {
                            return <OrderCard key={item._id} {...item}/>
                        })}
                    </div>

                </div>
                <div className={feedPageStyles.halfRight}>
                    <div className={feedPageStyles.ordersBoard}>
                        <div className={`${feedPageStyles.ordersBoardCell} mr-4`}>
                            <div className="text text_type_main-medium mb-2">Готовы:</div>
                            <div className={feedPageStyles.ordersBoardItems}>
                                {doneItems.map(item => {
                                    return <div key={item._id} className={feedPageStyles.ordersBoardItem}>{item.number}</div>
                                })}
                            </div>
                        </div>
                        <div className={`${feedPageStyles.ordersBoardCell} ml-4`}>
                            <div className="text text_type_main-medium mb-2">В работе:</div>
                            <div className={feedPageStyles.ordersBoardItems}>
                                {inProgressItems.map(item => {
                                    return <div key={item._id} className={`${feedPageStyles.ordersBoardItem} ${feedPageStyles.inProgress}`}>{item.number}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={feedPageStyles.totalCountSection}>
                        <div className="text text_type_main-medium mb-2">Готовы:</div>
                        <p className={`${feedPageStyles.totalCount} text text_type_digits-large`}>{total}</p>
                    </div>
                    <div className={feedPageStyles.totalCountSection}>
                        <div className="text text_type_main-medium mb-2">Выполнено за сегодня:</div>
                        <p className={`${feedPageStyles.totalCount} text text_type_digits-large`}>{totalToday}</p>
                    </div>
                </div>
            </div>
        </main>

    );
}
