import React from "react"
import { FormatCurrency } from "@/app/shared/utilities/formatCurrency";
import styles from "./cart-item-product-details.module.scss";

const CartItemProductDetails = ({cartItem}) => {
  return (
    <div className={styles.product}>
        <h3 className={styles.product__name}>{cartItem.name}</h3>
        <span className={styles.product__description}>{cartItem.description}</span>

        <div>
        <ul className={styles.product__variants}>
            <li><b>Edge Profile</b>: Round Edge</li>
            <li><b>Diameter</b>: 10.5" - 266mm </li>
        </ul>
        <span className={styles.product__price}>{FormatCurrency(cartItem.price)}</span>
        </div>
    </div>
  )
};

export default CartItemProductDetails;
