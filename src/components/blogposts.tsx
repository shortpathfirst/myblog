import { BlogPost, MetadataBlog } from '@/lib/interfaces'
import React from 'react'
import BlogPostCard from './blogpostcard'
import styles from './blogpage.module.css'

const BlogPosts = ({ blogData }: {
    blogData: BlogPost[]
}) => {
    return (
        <div>
            {
                blogData.sort((a, b) => {
                    if (new Date(a.metadata.date) > new Date(b.metadata.date))
                        return -1
                    else
                        return 1;
                })
                    .map((post, i) => (
                        <BlogPostCard
                            key={i}
                            imageSrc={"file.svg"}
                            title={post.metadata.title}
                            href={`/blog/${post.slug}`}
                            description={post.metadata.description} />
                    ))
            }
        </div>
    )
}

export default BlogPosts