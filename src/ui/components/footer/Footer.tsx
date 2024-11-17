import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './footer.module.css'

export default function Footer() {

    const icon_size = '2x';

    const LINKS = [
        { url: "https://github.com/shortpathfirst", label: "GitHub", icon: faGithub },
        { url: "https://github.com/shortpathfirst", label: "LinkedIn", icon: faLinkedin },
        { url: "https://github.com/shortpathfirst", label: "Email", icon: faEnvelope },
    ]

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.social}>
                    {LINKS.map((link,i) =>
                        <a key={i} href={link.url} target="_blank" aria-label={link.label} >
                            <FontAwesomeIcon icon={link.icon} size={icon_size} />
                        </a>
                    )}
                </div>
                <div className={styles.description}>
                    Made with Next.js and hosted on Vercel
                </div>
            </div>
        </footer>
    );
}