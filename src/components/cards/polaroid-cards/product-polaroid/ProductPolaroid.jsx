import React from 'react'
import styles from './product-polaroid.module.scss';
import { FormatCurrency } from '../../../../utilities/formatCurrency';

export default function ProductPolaroid({isSlide}) {
  return (
    <>
      <a href='/'  className={`${styles.card} ${isSlide ? styles['card--slide'] : ''}`}>
          <img srcSet="test-product.png"/>
          <footer>
            <span>Product Name</span>
            <span>{FormatCurrency(2.00)}</span>
          </footer>
      </a>
    </>
  )
}