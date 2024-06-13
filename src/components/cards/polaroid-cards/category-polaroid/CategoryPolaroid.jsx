import React from 'react'
import styles from './category-polaroid.module.scss';

export default function ProductPolaroid({category}) {
  return (

    <>
      <a href='' className={`${styles.card}`}>
          <img srcSet="test-product.png"/>
          <span>{category}</span>
      </a>
    </>
  )
}