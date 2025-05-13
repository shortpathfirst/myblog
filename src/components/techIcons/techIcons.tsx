import { Tag } from '@/lib/interfaces'
import React from 'react'
import styles from './techIcons.module.css'

export const TechIcons = ({ items }: { items: Tag[] }) => {
    return (
        <div className={styles.avatarGroup}>
            {items.map((item, i) => (
                // <ViewTransition key={i} name={`avatar-${item.slug}-${author.handle}`}>
                <span key={i} className={styles["technology-icon"]}>
                    <img src={item.url} alt={item.name} />
                </span>
            ))}
        </div>
    )
}
