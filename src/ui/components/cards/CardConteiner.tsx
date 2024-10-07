import { Children } from "react";
import styles from './cardcontainer.module.css'
export default function CardConteiner({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (

      <div className={styles.cardContainer}>
        {children}
      </div>

  );
}