import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <p className={styles.welcomeParagraph}>
        Hello and Welcome 👋&nbsp;
      </p>
    </div>
  );
}
