import { BlogPost } from '@/lib/interfaces'
import React from 'react'
import styles from './blogpage.module.css'
import BlogPostCard from './blogpostcard'

const BlogPosts = ({ blogData }: {
    blogData: BlogPost[]
}) => {
    return (
        <div className={styles.cardContainer}>
            {
                blogData.map((post, i) => (
                    <BlogPostCard
                        key={i}
                        imageSrc={post.metadata.imageUrl ?? "/myblog/file.svg"}
                        title={post.metadata.title}
                        href={`/blog/${post.slug}`}
                        description={post.metadata.description}
                        tags={post.metadata.tags}
                    />
                ))
            }
        </div>
    )
}

export default BlogPosts