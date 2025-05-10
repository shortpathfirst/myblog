import React from 'react'
import styles from './footer.module.css'
export const FooterSection = () => {
  return (
    <footer>
      <TopShape></TopShape>

      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>

        </div>

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
    <svg xmlns="http://www.w3.org/2000/svg" display={'block'} fill='rgb(0,0,0)' height={"165px"} width={"100%"} transform='scale(1,1)' viewBox="0 0 1080 200" preserveAspectRatio="none">
      <path d="M 1080,200 V 0 L 780,140 0,0 v 200 z"></path>
    </svg>
  )
}
