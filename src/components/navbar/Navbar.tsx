import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
export const Navbar = () => {
    const NAVLINKS = [
        { url: "/blog", label: "Blog" },
        { url: "/projects", label: "Projects" },
        { url: "/experience", label: "Experience" },
        { url: "/about", label: "About" },
    ]
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <Link href="/" className={styles.link}>
                        Homepage
                    </Link>
                </h1>
                <div className={styles.iconGroup}>
                    {NAVLINKS.map((el,i)=>(
                         <Link key={i} className={styles.iconLink} href={el.url} >{el.label}</Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
