import React from 'react'
import { getBlogPosts } from '@/lib/posts';
import styles from './blogpage.module.css'
import Link from 'next/link';
import PageHeader from '../header/pageHeader';
import BlogPostCard from './blogpostcard';
import headerbackground from '@/assets/images/headerbackground.png'
import filesvg from '@/assets/file.svg'

const BlogNews = async () => {
    const blogdata = (await getBlogPosts()).slice(0, 3);

    return (
        <section className={styles.newsSection}>
            <PageHeader
                backgroundImage={headerbackground}
                spanColor='#8169eb'>
                A small section of <span>recent project</span>
            </PageHeader>
            <div className={styles.cardContainer}>
                {
                    blogdata.map((post, i) => (
                        <BlogPostCard
                            key={i}
                            imageSrc={post.metadata.imageUrl ?? filesvg}
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