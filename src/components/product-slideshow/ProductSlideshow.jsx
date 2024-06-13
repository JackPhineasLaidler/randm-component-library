import React from "react";
import styles from './product-slideshow.module.scss';

const ProductSlideshow = (props) => {

    //ON CLICK OF OTHER IMAGES, CHANGE THE PATH OF THE IMAGE, SWAP PRIMARY IMAGE PATH WITH CLICKED ONE
  return (
    <div className={styles.productslideshow}>
        <img srcSet="/test-product.png" className={styles.productslideshow__focused}/>
        <div className={styles.productslideshow__slideshow}>
            <img srcSet="/test-product.png"/>
            <img srcSet="/test-product.png"/>
            <img srcSet="/test-product.png"/>
        </div>
    </div>
    )
};

export default ProductSlideshow;
