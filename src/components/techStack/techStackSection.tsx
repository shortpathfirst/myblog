import React from 'react'
import styles from './techStack.module.css'
import TechFigure from './techFigure';
import TitleBand from '../header/titleBand';

const TechStackSection = () => {
    return (
        <section className={styles.section} id='mytechstack'>
            <TitleBand>🛠 My Tech Stack</TitleBand>
            <div className={styles.figure}>
                <TechFigure />
                <div className={styles.poweredby}><span>D3</span> Chart</div>
            </div>
        </section>
    )
}
export default TechStackSection