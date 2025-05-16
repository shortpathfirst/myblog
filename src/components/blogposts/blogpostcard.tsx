
import React, { CSSProperties } from 'react'
import styles from './blogpage.module.css'
import Image from 'next/image';
import { Tag } from '@/lib/interfaces';
import Link from 'next/link';
import { TechIcons } from '../techIcons/techIcons';

type CardProps = {
	imageSrc: string;
	title: string;
	description?: string;
	href: string;
	tags: Tag[];
	cardStyle?: "post" | "project"
}
const BlogPostCard = ({ imageSrc, title, href, description, tags, cardStyle = "post" }: CardProps) => {
	const backgroundPosts: CSSProperties = {
		"background": "radial-gradient(circle, rgba(174, 238, 222, 1) 0%, rgba(150, 192, 255, 1) 100%)"
	}
	const backgroundProject = {
		"background": "radial-gradient(circle,rgba(219, 153, 81, 1) 0%, rgba(222, 115, 115, 1) 100%)"
	}
	const background = cardStyle === "project" ? backgroundProject : backgroundPosts

	return (
		<Link href={href}
			className={styles.card}
			style={background}
			rel="noopener noreferrer"
		//    target="_blank"
		>
			<Image
				src={imageSrc}
				alt={title}
				width={400}
				height={250}
				className={styles.cardImg}
				priority={true}
			/>
			<div className={styles.cardTitle}>
				<h2>{title}</h2>
			</div>
			{
				description &&
				<div className={styles.cardDescription}>
					<p>{description}</p>
				</div>
			}
			{
				tags?.length > 0 &&
				<TechIcons items={tags} />
			}

		</Link>
	)
}

export default BlogPostCard