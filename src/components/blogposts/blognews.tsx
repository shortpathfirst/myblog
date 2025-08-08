import React from 'react'
import { getBlogPosts } from '@/lib/posts';
import styles from './blogpage.module.css'
import Link from 'next/link';
import PageHeader from '../header/pageHeader';
import { baseUrl } from '@/lib/constants';
import BlogPostCard from './blogpostcard';

const BlogNews = async () => {
    const blogdata = (await getBlogPosts()).slice(0, 3);

    return (
        <section className={styles.newsSection}>
            <PageHeader
                backgroundImage={`${baseUrl}/images/headerbackground.png`}
                spanColor='#8169eb'>
                A small section of <span>recent project</span>
            </PageHeader>
            <div className={styles.cardContainer}>
                {
                    blogdata.map((post, i) => (
                        <BlogPostCard
                            key={i}
                            imageSrc={post.metadata.imageUrl ?? `${baseUrl}/file.svg`}
                            title={post.metadata.title}
                            href={`/blog/${post.slug}`}
                            description={post.metadata.description}
                            tags={post.metadata.tags}
                        />
                    ))
                }
            </div>
            <Link href={"/blog"}><button className={styles.btn}>See my work</button></Link>
        </section>
    )
}

export default BlogNews