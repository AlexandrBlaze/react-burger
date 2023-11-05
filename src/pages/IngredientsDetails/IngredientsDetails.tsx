import styles from './IngredientsDetails.module.css'
import React from "react";
import DetailedOrderCard from "../../components/DetailedOrderCard/DetailedOrderCard";


export default function OrderDetailPage() {
    return (
        <div className={styles.wrapper}>
            <DetailedOrderCard/>
        </div>
    )
}