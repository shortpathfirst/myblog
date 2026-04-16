"use client";

import React from 'react'
import styles from './expertiseSection.module.css'
import Image from 'next/image'
import serviceList from '@/content/expertises.json'
import TitleBand from '../header/titleBand';
import ExpertiseCard from './expertiseCard/expertiseCard';
import filesvg from '@/assets/file.svg'


function ExpertiseSection() {

    return (
        <section className={styles.section} id='expertise'>
            <TitleBand>Expertise</TitleBand>
            <div className={styles.gridWrapper}>
                {
                    serviceList.map((service, i) => (

                        <ExpertiseCard
                            key={i}
                            icon={
                                <Image
                                    className={styles.logo}
                                    height={50} width={50}
                                    src={service.url || filesvg}
                                    alt={service.name}
                                />}
                            title={service.name.toUpperCase()}
                            description={service.description}
                        />

                    ))
                }

            </div>
        </section>
    )
}
export default ExpertiseSection