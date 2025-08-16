import React from 'react'
import styles from './techModal.module.css'
import ProgressBar from './progressBar'
import Image from 'next/image'

type techModalProps = {
    data: {
        title: string,
        description: string,
        progress: number,
        imageUrl: string,
    }
    handleCloseModal: () => void,
}
const TechModal = ({ data, handleCloseModal }: techModalProps) => {
    return (
        <div className={styles.modal}>
            <button className={styles.closeIcon} onClick={handleCloseModal}>x</button>
            <div className={styles.titleSection}>
                {
                    data.imageUrl &&
                    <Image className={styles.titleIcon}
                        width={40}
                        height={40}
                        src={data.imageUrl}
                        alt={data.title} />
                }
                <h2>{data.title}</h2>
            </div>
            <div className={styles.divisor}/>
            <h3>Proficiency</h3>
            <ProgressBar progress={data.progress}></ProgressBar>
            <h3>What is it?</h3>
            <p>
                {data.description}
            </p>
        </div>
    )
}

export default TechModal