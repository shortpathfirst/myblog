import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  redirect('/blog');
  return (
    <div className={styles.page}>
      <main className={styles.main}>

      </main>
    </div>
  );
}
