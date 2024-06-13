import React from "react"
import styles from './input-label.module.scss'

const InputLabel = ({inputId, labelText, isRequired}) => {
  return (
    <label className={styles.label} htmlFor={inputId}>{`${labelText}${isRequired ? '*' : ''}` }</label>
  )
};

export default InputLabel;
