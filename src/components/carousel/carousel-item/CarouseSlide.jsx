import React, { useEffect } from 'react'
import styles from '../carousel.module.scss'

export default function carouselItem(props) {
    return (
        <div className={styles.carousel__slide} key={props.itemKey} aria-roledescription="slide" role="group" aria-label={`Slide ${props.itemId} of ${props.totalSlides}`}>
            {props.children}
        </div>
    )
}

