"use client";

import React from 'react'
import styles from './progressbar.module.css'
import useScrollTop from '@/lib/hooks/useScrollTop';

const ProgressBar = () => {

    const scrollTop = useScrollTop();

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}
                style={{ width: `${scrollTop}%` }}
            />
        </div>
    )
}

export default ProgressBar