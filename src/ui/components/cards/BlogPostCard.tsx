import Link from 'next/link';
import Image from 'next/image';
import styles from './blogpostcard.module.css'

interface CardProps {
	imageSrc: string;
	title: string;
	description?: string;
	href: string;
}

export default function BlogPostCard({ imageSrc, title, href, description }: CardProps) {
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
			<div className={styles.description} style={!description?{"display":"none"}:undefined}>
				<p>{description}</p>
			</div>
		</Link>
	);
};
