import React from 'react'
import { getBlogPosts } from '@/lib/posts'
import BlogPosts from '@/components/blogposts/blogposts'
import PageHeader from '@/components/header/pageHeader';
import { baseUrl } from '@/lib/constants';
// import { unstable_ViewTransition as ViewTransition } from 'react'

const Page = async () => {
    const blogdata = await getBlogPosts();

    return (
        // <ViewTransition>
        <div className='container'>
            <section>
                <PageHeader
                    backgroundImage={`${baseUrl}/images/blogabstract.png`}
                    spanColor='#588ef3'>
                    <span>Blog</span> page
                </PageHeader>
                <BlogPosts blogData={blogdata}></BlogPosts>
            </section>
        </div>

    )
}

export default Page

