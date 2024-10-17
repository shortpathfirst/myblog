import React from 'react'
import styles from './imagehovercard.module.css'
type Props = {
    title:string;
    children:string;
}
export default function ImageHoverContent({title,children}:Props) {
  return (
    <div className={styles.cardContent}>
        <h1>{title}</h1>
        <hr></hr>
        <p>{children}</p>
    </div>
  )
}

