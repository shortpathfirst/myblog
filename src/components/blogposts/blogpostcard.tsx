
import React from 'react'
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
}
const BlogPostCard = ({ imageSrc, title, href, description, tags }: CardProps) => {
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
				<TechIcons items={tags}/>
			}

		</Link>
	)
}

export default BlogPostCard