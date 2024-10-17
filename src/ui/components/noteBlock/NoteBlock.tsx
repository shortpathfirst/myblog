import React from 'react'
import styles from './noteBlock.module.css'

type Props ={
    title?:string,
    children:string
}

function NoteBlock({title="Note",children}:Props) {
  return (
    <p className={styles.note}>
        <b>{title}</b>:
        {children}
    </p>
  )
}

export default NoteBlock