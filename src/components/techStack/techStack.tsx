import React from 'react'
import styles from './techStack.module.css'
import TechFigureRadial from './techFigureRadial';

const TechStack = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>🛠 My Tech Stack</h1>
            {/* <div className={styles.figure}>
                <Dendrogram></Dendrogram>
            </div> */}
            <div className={`${styles.figure} ${styles.imageEffect}`}>
                <TechFigureRadial/>
                <div className={styles.poweredby}>Powered by <span>D3</span></div>
            </div>
        </section>
    )
}

export default TechStack