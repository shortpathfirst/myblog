import styles from './navbar.module.css'
import NavButton from './NavButton';
import ButtonDownload from '../ButtonDownload/ButtonDownload';
import MobileMenuToggle from './MobileMenuToggle';
import PageContainer from '../page-container/PageContainer';
import NavbarProfile from './NavbarProfile';
import { NAVLINKS } from '@/lib/constants';


export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<PageContainer>
				<div className={styles.container}>
					<NavbarProfile></NavbarProfile>
					<div className={styles.navButtonsContainer}>
						<div className={styles.navButtons}>
							{NAVLINKS.map((url,i) =>
								<NavButton key={i} href={url.url} label={url.label} />
							)}
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

