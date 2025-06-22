import getFormattedDate from '@/lib/getFormattedDate';
import { MetadataBlog } from '@/lib/interfaces';
import React from 'react'
import styles from './blogpage.module.css'
import { TechIcons } from '../techIcons/techIcons';
import Image from 'next/image'

const BlogPageHeader = ({ data }: { data: MetadataBlog }) => {
    return (
        <section className={styles.headerSection}>
            <div className={styles.herotitle}>
                <Image
                    src={`/images/pastel-abstract.jpg`}
                    alt="Hero Background"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
                <h1>{data.title}</h1>
            </div>

            <div className={styles.description}>
                <div>
                    <p className={styles.date}>{getFormattedDate(data.date)}</p>
                    <p>{data.description}</p>
                    <ul className={styles.taglist} >
                        {data.tags.map((tag, i) => (
                            <li key={i}>
                                {tag.url && <Image src={tag.url} alt={tag.name} width={15} height={15} />}
                                {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>
                <TechIcons items={data.tags} />
            </div>
            <hr />
        </section>
    )
}

export default BlogPageHeader