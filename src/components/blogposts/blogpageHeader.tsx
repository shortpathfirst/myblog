import getFormattedDate from '@/lib/getFormattedDate';
import { Tag } from '@/lib/interfaces';
import React from 'react'
import styles from './blogpage.module.css'
import { TechIcons } from '../techIcons/techIcons';
import { baseUrl } from '@/lib/constants';

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
        <section>
            <div className={styles.herotitle} style={{backgroundImage:`url('${baseUrl}/images/pastel-abstract.jpg')`}}>
                <h1>{data.title}</h1>
            </div>

            <div className={styles.description}>
                <div>
                    <p className={styles.date}>{getFormattedDate(data.date)}</p>
                    <p>{data.description}</p>
                    <ul  className={styles.taglist} >
                        {data.tags.map((tag, i) => (
                            <li key={i}>{tag.name}</li>
                        ))}
                    </ul>
                </div>
                <TechIcons items={data.tags} />
            </div>
            <hr/>
        </section>
    )
}

export default BlogPageHeader