import React from "react";
import styles from "./cart-item.module.scss";
import CartItemImage from "./cart-item-image/CartItemImage";
import CartItemProductDetails from "./cart-item-product-details/CartItemProductDetails";
import CartItemActions from "./cart-item-actions/CartItemActions";

const CartItem = ({cartItem, hasControlls=true}) => {
  return (
    <>
      <div className={styles.cartitem}>

        <CartItemImage image={'/test-product.png'} alt={cartItem.imageDescription}></CartItemImage>

        <CartItemProductDetails cartItem={cartItem} ></CartItemProductDetails>

        {hasControlls ? <CartItemActions cartItem={cartItem}></CartItemActions> : null}
      </div>
    </>
  )
};

export default CartItem;
