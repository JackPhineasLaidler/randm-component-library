import React from 'react'
import styles from './product-card.module.scss';
import { FormatCurrency } from '../../../utilities/formatCurrency';

export default function ProductCard() {
  return (
    <a href='/RandMShire/product'>
      <div className={`${styles.card }`}>
          <img srcSet="/test-product.png"/>
          <footer className={styles.card__details}>
            <span className={styles.card__name}>Product Name</span>
            <span className={styles.card__description}>lorem ipsum hudf sinf foldufr dska djurm lorem ipsum hudf sinf foldufr dska djurm an un hudf sinf ufs dsni dsdiier sdjij ssdska djurm an un hudf sinf ufs dsni dsdiier sdjij ssd</span>
            <span className={styles.card__price}>{FormatCurrency(1220)}</span>
          </footer>
      </div>
    </a>
  )
}