import React from 'react'
import RadialDendrogram from './techRadialDendrogram';
import styles from './techStack.module.css'

const TechStack = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>🛠 My Tech Stack</h1>
            {/* <div className={styles.figure}>
                <Dendrogram></Dendrogram>
            </div> */}
            <div className={styles.figure}>
                <RadialDendrogram/>
            </div>

        </section>
    )
}

export default TechStack