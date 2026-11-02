import React from 'react'
import styles from './header.module.css'

const TitleBand = ({ children }: { children: string }) => {
    return (
        <div className={styles.titleBand}>
            <h1 className={`${styles.h1Title} ${styles.gradientTitle}`}>
                {children}
            </h1>
        </div>
    )
}

export default TitleBand