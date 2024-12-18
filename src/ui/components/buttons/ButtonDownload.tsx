'use client'
import styles from '@/ui/styles/buttondownload.module.css'

export default function ButtonDownload() {
    return (
        <a
        href="/undefined.pdf"
        download
        className={styles.button}
    >
        Download CV
    </a>
    )
}