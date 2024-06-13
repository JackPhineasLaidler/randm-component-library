'use client'

import React from 'react'
import styles from './primary-button.module.scss';
import Link from 'next/link';

export default function Button({onClickFunction, buttonText, buttonType = 'button', isFullWidth, isSecondary, linkDestination}) {
  return (
    <>
      {linkDestination ? 
      <Link
        href={linkDestination}
        className={isFullWidth ? `${styles.bttn} ${styles.bttn__full}` : (isSecondary ? `${styles.bttn} ${styles.bttn__secondary}` : styles.bttn)}
      >
        {buttonText}
      </Link>
      : 
      <button
        onClick={onClickFunction ? onClickFunction : null}
        className={isFullWidth ? `${styles.bttn} ${styles.bttn__full}` : (isSecondary ? `${styles.bttn} ${styles.bttn__secondary}` : styles.bttn)}
        type={buttonType}
      >
        {buttonText}
      </button>}
    </>
  )
}