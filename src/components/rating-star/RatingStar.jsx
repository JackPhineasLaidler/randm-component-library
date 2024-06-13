import styles from './rating-star.module.scss';


export default function Select () {
    return (
        <span className={styles.star__background}>
            <span className={styles.star}>&#9733;</span>
        </span>
    )
}