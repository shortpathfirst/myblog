import styles from '@/ui/styles/cards/cardcontainer.module.css'

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