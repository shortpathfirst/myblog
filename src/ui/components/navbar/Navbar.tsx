import styles from './navbar.module.css'
import NavButton from './NavButton';
import ButtonDownload from '../ButtonDownload/ButtonDownload';
import MobileMenuToggle from './MobileMenuToggle';
import PageContainer from '../page-container/PageContainer';
import NavbarProfile from './NavbarProfile';


export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<PageContainer>
				<div className={styles.container}>
					<NavbarProfile></NavbarProfile>
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

