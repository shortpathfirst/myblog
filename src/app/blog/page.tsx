import React from 'react'
import { getBlogPosts } from '@/lib/posts'
import BlogPosts from '@/components/blogposts/blogposts'
// import { unstable_ViewTransition as ViewTransition } from 'react'

const Page = async () => {
    const blogdata = await getBlogPosts();

    return (
        // <ViewTransition>
            <div className='container'>
                <section>
                    <h1>Blog page</h1>
                    <BlogPosts blogData={blogdata}></BlogPosts>
                </section>
            </div>
       
    )
}

export default Page

