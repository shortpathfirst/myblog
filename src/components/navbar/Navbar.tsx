"use client";

import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import useScrollDirection from '@/lib/hooks/useScrollDirection'
export const Navbar = () => {
    const NAVLINKS = [
        { url: "/blog", label: "Blog" },
        { url: "/projects", label: "Projects" },
        { url: "/resume", label: "Resume" },
        { url: "/#contacts", label: "Contacts" },
    ]
    const isScrollingUp = useScrollDirection();
    return (
        <nav className={`${styles.navbar} ${!isScrollingUp ? styles.hidden : ''}`}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <Link href="/" className={styles.link}>
                        PORTFOLIO BLOG
                    </Link>
                </h1>
                <div className={styles.iconGroup}>
                    {NAVLINKS.map((el, i) => (
                        <Link key={i} className={styles.iconLink} href={el.url} >{el.label}</Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
