import React from 'react'
import styles from './blogpage.module.css'
import { getBlogPosts } from '@/lib/posts'
import BlogPosts from '@/components/blogposts'
import { unstable_ViewTransition as ViewTransition } from 'react'

const Page = async () => {
     const blogdata = await getBlogPosts();

    return (
        <ViewTransition>
        <div className='container'>
            <section>
                 <h1>Blog page</h1>
                <div className={styles.cardContainer}>
                    <BlogPosts blogData={blogdata}></BlogPosts>
                </div>
            </section>
        </div>
        </ViewTransition>
    )
}

export default Page

