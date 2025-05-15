import React from 'react'
import ContactForm from './contactForm'
import styles from './contacts.module.css'
import CodeTopBar from '../codeTopBar/codeTopBar'

const Contacts = () => {
    return (
        <section>
            <div className={styles.contactHeader}>
                <h1>Contact me</h1>
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
                            CONTACT INFO : myemail@gmail.com
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