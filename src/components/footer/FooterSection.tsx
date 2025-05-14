import React from 'react'
import styles from './footer.module.css'

export const FooterSection = () => {
  return (
    <footer>
      <TopShape></TopShape>

      <div className={styles.footerContainer}>
        <FooterContent />
        <div className={styles.copyrightSection}>
          <p>
            © 2025 My Blog - All Rights Reserved &nbsp;
            <a href="https://github.com/shortpathfirst/myblog" target="_blank">Portfolio Blog</a>
          </p>
        </div>
      </div>

    </footer>
  )
}

const TopShape = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      display={'block'}
      fill='rgb(0,0,0)'
      height={"165px"}
      width={"100%"}
      transform='scale(1,1)'
      viewBox="0 0 1080 200"
      preserveAspectRatio="none">
      <path d="M 1080,200 V 0 L 780,140 0,0 v 200 z"></path>
    </svg>
  )
}

const FooterContent = () => {
  const codeSource = [
    { link: "https://localhost:3000/link", name: "Kaggle" },
    { link: "https://localhost:3000/link", name: "Observable" },
    { link: "https://localhost:3000/link", name: "Linkedin" },
    { link: "https://localhost:3000/link", name: "Github" },
  ]
  const tecnologyUsed = [
    { link: "https://localhost:3000/link", name: "Next.js" },
    { link: "https://localhost:3000/link", name: "MDX" },
    { link: "https://localhost:3000/link", name: "i18 React" },
  ]
  const contact = [
    { link: "https://localhost:3000/link", name: "Email" },
    { link: "https://localhost:3000/link", name: "Privacy Policy" },
    { link: "https://localhost:3000/link", name: "Term of Use" },
  ]
  return (
    <div className={styles.row}>
      {/* My Notebooks */}
      <div className={styles.colLeft}>
        <div className={styles.footerWidget}>
          <h4>My Notebooks</h4>
          <ul className={styles.footerLinks}>
            {codeSource.map((s, i) =>
              <li key={i}><a href={s.link} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
            )}
          </ul>
        </div>
      </div>

      {/* Tecnology Used */}
      <div className={styles.colMid}>
        <div className={styles.footerWidget}>
          <h4>Tecnology Used</h4>
          <ul className={styles.footerLinks}>
            {tecnologyUsed.map((s, i) =>
              <li key={i}><a href={s.link} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
            )}
          </ul>
        </div>
      </div>

      {/* Contact */}
      <div className={styles.colMid}>
        <div className={styles.footerWidget}>
          <h4>Contact</h4>
          <ul className={styles.footerLinks}>
            {contact.map((s, i) =>
              <li key={i}><a href={s.link} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
