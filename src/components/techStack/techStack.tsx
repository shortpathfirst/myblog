import React from 'react'
import styles from './techStack.module.css'
import TechFigure from './techFigure';
import Title from '../header/title';

const TechStack = () => {
    return (
        <section className={styles.section}>
            <Title>🛠 My Tech Stack</Title>
    
            <div className={styles.figure}>
                <TechFigure/>
                <div className={styles.poweredby}>Powered by <span>D3</span></div>
            </div>
        </section>
    )
}
export default TechStack