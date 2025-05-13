import React from 'react'
import styles from './blogpage.module.css'
import { getBlogPosts } from '@/lib/posts'
import { MetadataBlog } from '@/lib/interfaces'
import BlogPosts from '@/components/blogposts'

type BlogPageParams = {
    params: Promise<{
        postsMeta: MetadataBlog;
        slug: string;
    }[]>
}


const Page = async () => {
     const blogdata = await getBlogPosts();

    return (
        <div className='container'>
            <section>
                 <h1>Blog page</h1>
                <div className={styles.cardContainer}>
                    <BlogPosts blogData={blogdata}></BlogPosts>
                </div>
            </section>
        </div>
    )
}

export default Page

