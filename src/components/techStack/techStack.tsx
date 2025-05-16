import React from 'react'
import RadialDendrogram from './techRadialDendrogram';
import styles from './techStack.module.css'
import techHierarchy from "@/content/techStack_v2.json";

const TechStack = () => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>🛠 My Tech Stack</h1>
            {/* <div className={styles.figure}>
                <Dendrogram></Dendrogram>
            </div> */}
            <div className={styles.figure}>
                <RadialDendrogram data={techHierarchy} />
                <div className={styles.poweredby}>Powered by <span>D3</span></div>
            </div>

        </section>
    )
}

export default TechStack