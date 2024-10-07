import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css'
import NavButton from './NavButton';
import ButtonDownload from '../ButtonDownload/ButtonDownload';
import MobileMenuToggle from './MobileMenuToggle';
import PageContainer from '../page-container/PageContainer';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<PageContainer>
				<div className={styles.container}>
					<div className={styles.nameImg}>
						<Link href={'/'}>
							<Image
								src="/assets/profile.webp"
								alt="Logo"
								width={40}
								height={40}
								className={styles.profileImg}
								priority={true}
							/>
						</Link>
						<Link href={'/'}>
							<h1 className={styles.profileName}>Andrea Blog</h1>
						</Link>
					</div>
					<div className={styles.navButtonsContainer}>
						<div className={styles.navButtons}>
							<NavButton href="/blog" label="Blog" />
							<NavButton href="/projects" label="Projects" />
							<NavButton href="/experience" label="Experience" />
							<NavButton href="/about" label="About" />
						</div>
					</div>
					<div className={styles.download}>
						<ButtonDownload></ButtonDownload>
					</div>
					<div className={styles.mobileMenu}>
						<MobileMenuToggle />
					</div>
				</div>
			</PageContainer>
		</nav>
	)
}

