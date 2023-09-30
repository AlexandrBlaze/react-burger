import styles from './Loader.module.css'

export default function Loader() {
    return (
        <div className={styles.preloader}>
            <div className={styles.loader}></div>
        </div>
    )
}