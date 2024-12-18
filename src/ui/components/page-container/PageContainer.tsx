
import styles from '@/ui/styles/pagecontainer.module.css'

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

