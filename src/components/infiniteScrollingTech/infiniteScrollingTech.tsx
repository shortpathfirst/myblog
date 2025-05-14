import React from 'react'
import styles from './infiniteScrolling.module.css'
import Image from 'next/image'

const InfiniteScrollingTech = () => {
    //This should be a prop
    const techStack = [
        { name: "HTML", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "NextJS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg" },
        { name: "D3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-plain.svg" },
        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "NodeJS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "TensorflowJS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
         { name: "QGIS", url: "/images/qgis-icon.png" },
    ]

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