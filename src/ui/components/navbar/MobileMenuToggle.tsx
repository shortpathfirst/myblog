'use client';
import { useState } from 'react';
import NavButton from './NavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import styles from './mobilemenu.module.css'
import ButtonDownload from '../ButtonDownload/ButtonDownload';

export default function MobileMenuToggle() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			<button onClick={toggleMobileMenu} className={styles.toggleButton}>
				<FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
			</button>
			{isMobileMenuOpen && (
				<div className={styles.menuContainer}>
					<div className={styles.menu}>
						<NavButton href="/blog" label="Blog" />
						<NavButton href="/projects" label="Projects" />
						<NavButton href="/experience" label="Experience" />
						<NavButton href="/about" label="About" />
					</div>
				</div>
			)}
		</>
	);
};
