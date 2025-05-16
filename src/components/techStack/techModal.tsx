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
                {/*The check does not ensure correct imageurl  */}
                {data.imageUrl && <Image className={styles.titleIcon} width={40} height={40} src={data.imageUrl} alt={data.title} />}
                <h2>{data.title}</h2>
            </div>
            <div className={styles.divisor}></div>
            <ProgressBar progress={data.progress}></ProgressBar>
            <p>
                {data.description}
            </p>
        </div>
    )
}

export default TechModal