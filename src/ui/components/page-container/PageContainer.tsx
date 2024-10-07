
import styles from './pagecontainer.module.css'

export default function PageContainer({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

