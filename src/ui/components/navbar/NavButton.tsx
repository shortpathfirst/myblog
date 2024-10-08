'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbutton.module.css'

interface NavButtonProps {
	href: string;
	label: string;
}

export default function NavButton({ href, label }: Readonly<NavButtonProps>) {
	const pathname = usePathname();

	const linkClasses = (path: string) =>
		`${styles.default } ${pathname === path 
			?styles.selected
			:styles.active}`;
	

	return (
		<Link href={href} className={linkClasses(href)}>
			{label}
		</Link>
	);
}