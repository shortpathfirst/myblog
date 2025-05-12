"use client"

import React, { useState } from "react";
import styles from './contacts.module.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        contactName: "",
        contactEmail: "",
        contactSubject: "",
        contactMessage: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("Form submitted:", formData);
    };

    return (
        <form name="contactForm" id="contactForm" onSubmit={handleSubmit}>
            <div className={styles.formField}>
                <input
                    name="contactName"
                    type="text"
                    id="contactName"
                    placeholder="Your Name"
                    minLength={2}
                    required
                    aria-required="true"
                    value={formData.contactName}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formField}>
                <input
                    name="contactEmail"
                    type="email"
                    id="contactEmail"
                    placeholder="Your Email"
                    required
                    aria-required="true"
                    value={formData.contactEmail}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formField}>
                <input
                    name="contactSubject"
                    type="text"
                    id="contactSubject"
                    placeholder="Subject"
                    value={formData.contactSubject}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formField}>
                <textarea
                    name="contactMessage"
                    id="contactMessage"
                    placeholder="Your Message"
                    rows={3}
                    cols={50}
                    required
                    aria-required="true"
                    value={formData.contactMessage}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.formField}>
                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>
            </div>
            {submitted && <p>Thank you for submitting the form!</p>}
        </form>
    );
};

export default ContactForm;
