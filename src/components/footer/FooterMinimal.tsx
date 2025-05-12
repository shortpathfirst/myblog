import { FaLinkedin, FaGithub, FaMailBulk } from "react-icons/fa"
import styles from './footer.module.css'


export const FooterMinimal = () => {
  // const icon_size = '2x';
  const HOSTPLATFORM = 'Github'
  const LINKS = [
    { url: "https://github.com/shortpathfirst", label: "GitHub", icon: FaGithub },
    { url: "https://github.com/shortpathfirst", label: "LinkedIn", icon: FaLinkedin },
    { url: "https://github.com/shortpathfirst", label: "Email", icon: FaMailBulk },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.social}>
          {LINKS.map((link, i) =>
            <a key={i} href={link.url} target="_blank" aria-label={link.label} >
              <link.icon/>
            </a>
          )}
        </div>
        <div className={styles.description}>
          Made with Next.js and hosted on {HOSTPLATFORM}
        </div>
      </div>
    </footer>
  )
}
