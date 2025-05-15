import { Tag } from '@/lib/interfaces'
import React from 'react'
import styles from './techIcons.module.css'
import Image from 'next/image'
// import { unstable_ViewTransition as ViewTransition } from 'react'

export const TechIcons = ({ items }: { items: Tag[] }) => {
    return (
        <div className={styles.iconsContainer}>
            {items.map((item, i) => (
                // View transition does not allow multiple TechIcons use
                // <ViewTransition key={i} name={`tech-icon-${item.name}`} >
                <span key={i} className={styles["technology-icon"]}>
                    <Image src={item.url} alt={item.name} width={50} height={50} />
                </span>
            ))}
        </div>
    )
}
