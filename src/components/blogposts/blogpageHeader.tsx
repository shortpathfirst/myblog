import getFormattedDate from '@/lib/getFormattedDate';
import { Tag } from '@/lib/interfaces';
import React from 'react'
import styles from './blogpage.module.css'
import { TechIcons } from '../techIcons/techIcons';

type HeaderProps = {
    data: {
        title: string;
        date: string;
        description: string;
        tags: Tag[];
    }
}
const BlogPageHeader = ({ data }: HeaderProps) => {
    return (
        <div className={styles.header}>
            <div>
            <h1>{data.title}</h1>
            <p className={styles.date}>{getFormattedDate(data.date)}</p>
            <p>{data.description}</p>
            <ul>{data.tags.map((tag, i) => (<li key={i}>{tag.name}</li>))}</ul>
            </div>
              <TechIcons items={data.tags} />
        </div>
    )
}

export default BlogPageHeader