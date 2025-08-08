import React from 'react'
import { getBlogPosts } from '@/lib/posts'
import styles from '@/components/blogposts/blogpage.module.css'
import PageHeader from '@/components/header/pageHeader';
import { baseUrl } from '@/lib/constants';
import { Metadata } from 'next';
import BlogPostCard from '@/components/blogposts/blogpostcard';
// import { unstable_ViewTransition as ViewTransition } from 'react'

export const metadata: Metadata = {
    title: 'Blog posts page',
    description: 'Page to share some posts about computer science topics and algorithms',
}

const Page = async () => {
    const blogdata = await getBlogPosts()

    return (
        // <ViewTransition>
        <section className='container'>
            <PageHeader
                backgroundImage={`${baseUrl}/images/blogabstract.png`}
                spanColor='#588ef3'>
                <span>Blog</span> page
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
        </section>
    )
}

export default Page

