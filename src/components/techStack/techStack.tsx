import React from 'react'
import styles from './techStack.module.css'
import Bubbles from '../d3/Bubbles';
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
           <div className={styles.figure}>
                <Bubbles />
                <div className={styles.poweredby}>Powered by <span>D3</span></div>
            </div>

        </section>
    )
}

export default TechStack