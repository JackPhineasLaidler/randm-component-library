import React from 'react'
import styles from './arrow-button.module.scss';

export default function ArrowButton({isBackButton, ariaLabel, disabled=false, type='button', onClickFunction}) {
  return (
    <button onClick={() => onClickFunction()} disabled={disabled} type={type} aria-label={ariaLabel} className={`${styles.arrowbutton } ${isBackButton ? styles.arrowbutton__back : styles.arrowbutton__forward}`}></button>
  )
}