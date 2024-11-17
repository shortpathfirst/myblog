'use client';
import { useState } from 'react';
import NavButton from './NavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import styles from './mobilemenu.module.css'
import { NAVLINKS } from '@/lib/constants';

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
						{NAVLINKS.map((url,i) =>
							<NavButton key={i} href={url.url} label={url.label} />
						)}
					</div>
				</div>
			)}
		</>
	);
};
