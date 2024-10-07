import styles from './buttononextjs.module.css'
function ButtonNextJs() {
  return (
    <div className={styles.ctas}>
    <a
      className={styles.primary}
      href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Deploy now
    </a>
  </div>
  )
}

export default ButtonNextJs