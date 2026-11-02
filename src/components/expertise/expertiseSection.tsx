"use client";

import Image from 'next/image'
import styles from './expertiseSection.module.css'
import serviceList from '@/content/expertises.json'
import TitleBand from '../header/titleBand';
import ExpertiseCard from './expertiseCard/expertiseCard';
import filesvg from '@/assets/file.svg'


function ExpertiseSection() {
    return (
        <section className={styles.section} id='expertise'>
            <TitleBand>What I Do</TitleBand>
            <table className={styles.expertiseTable}>
                <thead>
                    <tr>
                        <th id='data-heading' scope='col'>📊 Data</th>
                        <th id='software-heading' scope='col'>💻 Software</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td headers='data-heading' data-label='📊 Data'>
                            <p className={styles.intro}>
                                The full lifecycle: collection and cleaning, exploratory analysis, statistical testing, feature engineering, predictive modeling and reporting.
                            </p>
                            <ul>
                                <li>Clean and explore data; apply statistical testing and feature engineering.</li>
                                <li>Build and evaluate predictive models, supervised or unsupervised learning</li>
                                <li>Explain results and share insights through dashboards</li>
                            </ul>
                        </td>
                        <td headers='software-heading' data-label='💻 Software'>
                            <p className={styles.intro}>
                                Full-stack applications, containerized and documented.
                            </p>
                            <ul>
                                <li>Design APIs with Flask or Express; build interfaces with React and Vite.</li>
                                <li>Use Docker, authentication, and system design fundamentals.</li>
                                <li>Automate with Beautiful Soup and Playwright; integrate agents and LLMs.</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 className={styles.cardsTitle}>My Expertise</h2>
            <div className={styles.gridWrapper}>
                {serviceList.map((service, i) => (
                    <ExpertiseCard
                        key={i}
                        icon={
                            <Image
                                className={styles.logo}
                                height={50}
                                width={50}
                                src={getAssetPath(service.url) || filesvg}
                                alt={service.name}
                            />
                        }
                        title={service.name.toUpperCase()}
                        description={service.description}
                    />
                ))}
            </div>
        </section>
    )
}
export default ExpertiseSection