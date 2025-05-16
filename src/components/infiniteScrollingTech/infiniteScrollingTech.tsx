import React from 'react'
import styles from './infiniteScrolling.module.css'
import Image from 'next/image'

type Props = {
    techStack: {
        name: string,
        url: string,
    }[]
}
const InfiniteScrollingTech = ({ techStack }: Props) => {
    return (
        <section className={styles.techContainer}>
            <div className={styles.scroll} style={{ '--time': `15s` } as React.CSSProperties}>
                <div>
                    {techStack.map((tech, index) => (
                        <span key={`first-${index}`}>{tech.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.scroll} style={{ '--time': `20s` } as React.CSSProperties}>
                <div>
                    {techStack.map((tech, index) => (
                        <span key={`second-${index}`}>{tech.name}</span>
                    ))}
                </div>
            </div>
            <div className={`${styles.scroll} ${styles.imgBox}`} style={{ '--time': `20s` } as React.CSSProperties}>
                <div>
                    {techStack.map((tech, index) => (
                        <Image key={`image-${index}`} height={50} width={50} src={tech.url} alt={tech.name} />
                    ))}

                </div>
            </div>

        </section>
    )
}

export default InfiniteScrollingTech