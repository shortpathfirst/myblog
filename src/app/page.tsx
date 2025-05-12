import styles from "./page.module.css";
import Contacts from "@/components/contact/contacts";

export default function Home() {
  return (
    <div className="container">
      <p className={styles.welcomeParagraph}>
        Hello and Welcome 👋&nbsp;
      </p>
      <Contacts/>
    </div>
  );
}
