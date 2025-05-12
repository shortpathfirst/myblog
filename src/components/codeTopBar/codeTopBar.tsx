import React from 'react'
import styles from './codeTopBar.module.css'

const CodeTopBar = () => {
    return (
        <div className={styles["screen-header"]}>
            <div className={styles["screen-header-left"]}>
                <div className={`${styles["screen-header-button"]} ${styles.close}`}></div>
                <div className={`${styles["screen-header-button"]} ${styles.maximize}`}></div>
                <div className={`${styles["screen-header-button"]} ${styles.minimize}`}></div>
            </div>
            <div className={styles["screen-header-right"]}>
                <div className={styles["screen-header-ellipsis"]}></div>
                <div className={styles["screen-header-ellipsis"]}></div>
                <div className={styles["screen-header-ellipsis"]}></div>
            </div>
        </div>
    )
}

export default CodeTopBar