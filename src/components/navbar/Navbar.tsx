import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <Link href="/" className={styles.link}>
                        Homepage
                    </Link>
                </h1>
                <div className={styles.iconGroup}>
                    <Link className={styles.iconLink} href="#"/>
                    <Link className={styles.iconLink} href="#"/>
                    <Link className={styles.iconLink} href="#"/>
                    <Link className={styles.iconLink} href="#"/>
                </div>
            </div>
        </nav>
    )
}
