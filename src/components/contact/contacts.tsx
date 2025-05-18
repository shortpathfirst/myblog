import React from 'react'
import ContactForm from './contactForm'
import styles from './contacts.module.css'
import CodeTopBar from '../codeTopBar/codeTopBar'
import { contacts } from '@/content/contacts'
import Title from '../header/title'

const Contacts = () => {
    return (
        <section id='contacts'>
            <div className={styles.contactHeader}>
                <Title>Contact me</Title>
                <h3>Reach out for a project or just say hello</h3>
            </div>
            <div className={styles.contactContent}>
                <CodeTopBar />
                <div className={styles.contactBody}>
                    <div className={styles.contactPrimary}>
                        <div className={styles.cstitle}>
                            <span>CONTACT</span>
                            <span>ME</span>
                        </div>
                        <div className={styles.csinfo}>
                            CONTACT INFO : {contacts.email}
                        </div>

                    </div>
                    <div className={styles.contactSecondary}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts