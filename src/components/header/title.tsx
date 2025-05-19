import React, { ReactNode } from 'react'
import styles from './header.module.css'

const Title = ({ children }: { children: ReactNode }) => {
    return (
        <h1 className={styles.h1Title}>
            {children}
        </h1>
    )
}

export default Title