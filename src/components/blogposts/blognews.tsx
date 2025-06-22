import React from 'react'
import BlogPosts from './blogposts'
import { getBlogPosts } from '@/lib/posts';
import styles from './blogpage.module.css'
import Link from 'next/link';
import PageHeader from '../header/pageHeader';
import { baseUrl } from '@/lib/constants';

const BlogNews = async () => {
    const blogdata = (await getBlogPosts()).sort((a, b) => {
        if (new Date(a.metadata.date) > new Date(b.metadata.date)) return -1
        else return 1;
    }).slice(0, 3);
    return (
        <section className={styles.newsSection}>
            <PageHeader
                backgroundImage={`${baseUrl}/images/headerbackground.png`}
                spanColor='#8169eb'>
                A small section of <span>recent project</span>
            </PageHeader>
            <BlogPosts blogData={blogdata}></BlogPosts>
            <Link href={"/blog"}><button className={styles.btn}>See my work</button></Link>
        </section>
    )
}

export default BlogNews