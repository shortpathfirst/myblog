import React from 'react'
import styles from './techStack.module.css'
import TechFigure from './techFigure';

const TechStack = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>🛠 My Tech Stack</h1>
            {/* <div className={styles.figure}>
                <Dendrogram></Dendrogram>
            </div> */}
            <div className={styles.figure}>
                <TechFigure/>
                <div className={styles.poweredby}>Powered by <span>D3</span></div>
            </div>
        </section>
    )
}
export default TechStack