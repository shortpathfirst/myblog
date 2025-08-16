import React from 'react'
import styles from './header.module.css'
import Title from './title'

const TitleBand = ({children}:{children:string}) => {
    return (
        <div className={styles.titleBand}>
            <Title>{children}</Title>
        </div>
    )
}

export default TitleBand