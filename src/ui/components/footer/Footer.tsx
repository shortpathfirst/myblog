import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './footer.module.css'

export default function Footer() {

    const icon_size = '2x';

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.social}>
                    <a href="https://github.com/lraveri" target="_blank" aria-label="GitHub" >
                        <FontAwesomeIcon icon={faGithub} size={icon_size} />
                    </a>
                    <a href="https://www.linkedin.com/in/lucaraveri" target="_blank" aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} size={icon_size} />
                    </a>
                    <a href="mailto:info@lucaraveri.com" aria-label="Email" >
                        <FontAwesomeIcon icon={faEnvelope} size={icon_size} />
                    </a>
                </div>
                <div className={styles.description}>
                    Made with Next.js and hosted on Vercel
                </div>
            </div>
        </footer>
    );
}