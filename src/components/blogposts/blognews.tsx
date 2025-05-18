import React from 'react'
import BlogPosts from './blogposts'
import { getBlogPosts } from '@/lib/posts';
import styles from './blogpage.module.css'
import Link from 'next/link';
import Title from '../header/title';

const BlogNews = async () => {
    const blogdata = (await getBlogPosts()).slice(0, 3);
    return (
        <section className={styles.newsSection}>
            <div className={styles.newsHeader}>
                <Title>A small section of <span>recent project</span></Title>
                <div className={styles.newsBackground}></div>
            </div>

            <BlogPosts blogData={blogdata}></BlogPosts>
            <Link href={"/blog"}><button className={styles.btn}>See my work</button></Link>
        </section>
    )
}

export default BlogNews