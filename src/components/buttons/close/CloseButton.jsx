import React from "react"
import styles from './close-button.module.scss'

const CloseButton = ({onClickFunction}) => {
  return (
    <button className={styles.closebutton} onClick={onClickFunction}>&#x2715;</button>
  )
};

export default CloseButton;