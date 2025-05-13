import Link from 'next/link';
import React from 'react'
import styles from '@/app/blog/blogpage.module.css'
import Image from 'next/image';
type CardProps = {
	imageSrc: string;
	title: string;
	description?: string;
	href: string;
}
const BlogPostCard = ({ imageSrc, title, href, description }: CardProps) => {
  return (
    		<Link href={href}
			className={styles.card}
			rel="noopener noreferrer"
		//    target="_blank"
		>
			<Image
				src={imageSrc}
				alt={title}
				width={400}
				height={250}
				className={styles.img}
				priority={true}
			/>
			<div className={styles.title}>
				<h2>{title}</h2>
			</div>
			{description ?
				<div className={styles.description}>
					<p>{description}</p>
				</div>
				: undefined}
		</Link>
  )
}

export default BlogPostCard