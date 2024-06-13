import React from "react";
import styles from './cart-item-image.module.scss';

const CartItemImage = ({image, altText}) => {
  return (
    <div className={styles.image}>
      <img srcSet="/test-product.png" alt={altText ? altText : `A RandMshire product image`}/>
    </div>
  )
};

export default CartItemImage;
