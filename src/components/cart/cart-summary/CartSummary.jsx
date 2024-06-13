import React, { useEffect, useState } from "react";
import styles from "./cart-summary.module.scss";
import Button from "@/app/shared/components/buttons/primary/PrimaryButton";
import { FormatCurrency } from "@/app/shared/utilities/formatCurrency";


const cartSummary = ({cartItems}) => {



  const discountPercent = 10;

  const [subTotal, setSubTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    let cartTotal = 0;
    cartItems.forEach(cartItem => {
      const cartItemTotal = cartItem.price * cartItem.quantity;
      cartTotal = cartTotal + cartItemTotal;
    });

    setSubTotal(cartTotal);

  }, [cartItems]);


  useEffect(() => {
    if (!discountPercent || discountPercent === 0) return;

    setDiscountedTotal((subTotal / 100 )* discountPercent);

  }, [subTotal]);


  return (
    <div className={styles.cartsummary}>
        <div className={styles.cartsummary__item}>
            <span>Subtotal</span>
            <span>{FormatCurrency(subTotal)}</span>
        </div>

        {discountPercent && cartItems.length ? <div className={`${styles.cartsummary__item} ${styles.cartsummary__item__discount}`}>
            <span>Discount ({discountPercent}%)</span>
            <span>-{FormatCurrency(discountedTotal)}</span>
        </div> : null}

        <div className={styles.cartsummary__total}>
          <div className={`${styles.cartsummary__item} ${styles.cartsummary__item__total}`}>
              <span>Total</span>
              <span>{FormatCurrency(subTotal - discountedTotal)}</span>
          </div>

          <Button buttonType="submit" buttonText="Checkout" isFullWidth={true}></Button>
        </div>
    </div>
  )
};

export default cartSummary;
