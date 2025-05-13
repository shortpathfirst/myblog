import { Tag } from '@/lib/interfaces'
import React from 'react'
import styles from './techavatar.module.css'

export const TechStackAvatar = ({ items }: { items: Tag[] }) => {
    return (
        <div className={`${styles.container} ${styles.avatarGroup}`}>
            {items.map((item, i) => (
                // <ViewTransition key={i} name={`avatar-${item.slug}-${author.handle}`}>
                <span key={i} className={styles.avatar}>
                    <img src={item.url} alt={item.name} />
                </span>
            ))}
        </div>
    )
}
