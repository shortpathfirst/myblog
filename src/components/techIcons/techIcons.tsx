import { Tag } from '@/lib/interfaces'
import React from 'react'
import styles from './techIcons.module.css'
import { unstable_ViewTransition as ViewTransition } from 'react'

export const TechIcons = ({ items }: { items: Tag[] }) => {
    return (
        <div className={styles.avatarGroup}>
            {items.map((item, i) => (
                <ViewTransition key={i} name={`tech-icon-${item.name}`} >
                    <span key={i} className={styles["technology-icon"]}>
                        <img src={item.url} alt={item.name} />
                    </span>
                </ViewTransition>
            ))}
        </div>
    )
}
