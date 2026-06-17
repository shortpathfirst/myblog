import React from 'react'
import styles from './page.module.css'
import { Metadata } from 'next'
import aduLogo from "@/assets/images/stemma_perugia.png";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Personal Resume',
    description: 'Resume about my Education, Expertise area, Projects',
}
const Resume = () => {
    const projects = [
        {
            "name": "Crimes Dashboard",
            "date": "December 2024 - February 2025",
            "isSite": true,
            "url": "https://github.com/shortpathfirst/MapDashboard",
            "descriptionList": [
                "A <strong>React</strong> dashboard with the use of <strong>Chackra UI</strong>.",
                "<strong>ExpressJS</strong> backend serving the crimes data to showcase",
                "To navigate the crimes of the City of Belém - Brazil in a modern site"
            ]
        },
        {
            "name": "Powerlifting Database",
            "date": "January 2025",
            "isSite": false,
            "url": "https://github.com/shortpathfirst/PowerliftingDatabase",
            "descriptionList": [
                "SPA application written in <strong>React</strong>",
                "<strong>Interactive data visualization</strong> using chart.js",
                "<strong>Java Springboot</strong> backend",
                "<strong>Unit and integration test for </strong> backend and for frontend",
            ]
        },
        {
            "name": "Leaf Segmentation",
            "date": "May 2025",
            "isSite": false,
            "url": "https://www.kaggle.com/code/shortpathfirst/wineanalysis",
            "descriptionList": [
                "Implementing image segmentation using U-Net implementation on a custom dataset ",
                "<strong>Tools:</strong> Kaggle; Tensorflow; Labelbox;"
            ]
        },
        {
            "name": "Judo-club",
            "date": "May 2025",
            "isSite": false,
            "url": "https://shortpathfirst.github.io/judo-club/",
            "descriptionList": [
                "A modern NextJS website for a judo club designed as a landing page for the club and to navigate about tecnhical resources about judo.",
                "Using <strong>MDX</strong> content management"
            ]
        }
    ]
    return (
        <div className={styles.resumeSection}>
            {/* Download sidebar */}
            <div className={styles.sidebar}>
                <h1>Resume</h1>
                <a className={styles["download-btn"]} href="/myblog/resume.pdf" target="_blank">Download</a>
            </div>
            {/* Content */}
            <div className={styles.resumeContent}>
                {/* <section className={styles.section}>
                    <h2 className={styles.heading}>Interests</h2>
                    <hr className={styles.divider} />

                    <p className={styles.intro}>
                        My primary professional interests focus on combining software development
                        with data-driven insights and visualization.
                    </p>

                    <ul className={styles.interestsList}>
                        <li className={styles.interestCard}>
                            <span className={styles.emoji}>👩🏻‍💻</span>
                            <div className={styles.interestContent}>
                                <strong> Software Engineering</strong>
                                <p>Building scalable, efficient, and maintainable applications.</p>
                            </div>
                        </li>

                        <li className={styles.interestCard}>
                            <span className={styles.emoji}>📈</span>
                            <div className={styles.interestContent}>
                                <strong>Data Analysis</strong>
                                <p>Extracting meaningful insights from complex datasets.</p>
                            </div>
                        </li>

                        <li className={styles.interestCard}>
                            <span className={styles.emoji}>🎨</span>
                            <div className={styles.interestContent}>
                                <strong>Data Visualization</strong>
                                <p>Designing clear and impactful visual representations of data.</p>
                            </div>
                        </li>
                    </ul>
                </section> */}

                <section className={styles.section}>
                    <h2 className={styles.heading}>Education</h2>
                    <hr />
                    <ul className={styles.educationList}>
                        <li className={styles.educationItem}>
                            <Image
                                src={aduLogo}
                                alt="Unipg logo"
                                className={styles.logo}
                            />
                            <div className={styles.content}>
                                <h3 className={styles.degree}>Bachelor of Science in Computer Engineering</h3>
                                <p className={styles.school}>Università degli studi di Perugia, PG</p>
                            </div>

                            <span className={styles.date}>Aug 2014 – Dec 2018</span>
                        </li>
                        <li className={styles.educationItem}>
                            <Image
                                src={aduLogo}
                                alt="Unipg logo"
                                className={styles.logo}
                            />
                            <div className={styles.content}>
                                <h3 className={styles.degree}>Attended Master of Science in Computer Engineering program</h3>
                                <p className={styles.school}>Università degli studi di Perugia, PG</p>
                            </div>
                            <span className={styles.date}>Aug 2019 – May 2022</span>
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>Expertise area</h2>
                    <hr />

                    <div>
                        <p>
                            Computer Engineer with a passion for web development, machine learning and data analysis.
                            I enjoy working with data and designing applications simple and intuitive to visualize and communicate the informations that are actually meaningful.
                            I prioritize clarity and usability, avoiding bloated code, vibe coding caos and
                            difficult to mantain projects.
                        </p>
                        <p>
                            Through my studies i built knowledge on system design to achieve the desired functionality, performance, and
                            reliability. Always learning and refining my skills through research and reading technical documentation of the tools i use.
                        </p>
                        <p>
                            When i code i apply design patterns when necessary and evaluate the algorithmic complexity to deliver efficient solutions.
                            My approach is to develop robust code based on solid software design, emphasizing <strong>clean architecture,maintainability, and performance, </strong>
                            qualities that really give value to the applications by following best practices to balance functionality with
                            long-term sustainability.
                        </p>
                        <p>
                            Proficient in machine learning and data analysis from building the foundation through data collection and scraping to cleaning,
                            and performing Exploratory Data Analysis and building a predictive once the data is well understood.
                            Creating insightful, interactive data visualizations that reveal patterns, communicate insights, and let the
                            data speak through compelling visuals.
                            Some experience in deep learning for image analysis, CNNs including segmentation and pattern recognition thanks to some of my personal projects.
                        </p>

                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>Projects</h2>
                    <hr />
                    <div className={styles.grid}>

                        {projects.map((project, i) => (
                            <div className={styles.project} key={i}>
                                <a href={project.url}>
                                    <strong>{project.name}</strong></a>
                                <p>{project.date}</p>
                                <ul>
                                    {project.descriptionList.map((descr, key) => (
                                        <li key={key} dangerouslySetInnerHTML={{ __html: descr }} />
                                    ))}
                                </ul>
                            </div>
                        ))
                        }

                    </div>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.heading}>💻 Technical Skills</h2>
                    <hr />

                    <div className={styles.skillBlock}>

                        <div className={styles.skillGroup}>
                            <h4 className={styles.groupTitle}>Languages</h4>
                            <div className={styles.tags}>
                                <span>JavaScript</span>
                                <span>TypeScript</span>
                                <span>Java</span>
                                <span>Python</span>
                            </div>
                        </div>

                        <div className={styles.skillGroup}>
                            <h4 className={styles.groupTitle}>Web Development</h4>

                            <div className={styles.subGroup}>
                                <span className={styles.subTitle}>Frontend</span>
                                <div className={styles.tags}>
                                    <span>React</span>
                                    <span>Next.js</span>
                                </div>
                            </div>

                            <div className={styles.subGroup}>
                                <span className={styles.subTitle}>Backend & APIs</span>
                                <div className={styles.tags}>
                                    <span>Express.js</span>
                                    <span>MongoDB</span>
                                    <span>PostgreSQL</span>
                                    <span>SQLite</span>
                                    <span>Swagger</span>
                                    <span>Postman</span>
                                </div>
                            </div>

                            <div className={styles.subGroup}>
                                <span className={styles.subTitle}>Data Visualization</span>
                                <div className={styles.tags}>
                                    <span>D3.js</span>
                                    <span>Chart.js</span>
                                    <span>Plotly</span>
                                </div>
                            </div>

                            <div className={styles.subGroup}>
                                <span className={styles.subTitle}>DevOps & Tools</span>
                                <div className={styles.tags}>
                                    <span>Git</span>
                                    <span>GitHub</span>
                                    <span>Docker</span>
                                    <span>Vite</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.skillGroup}>
                            <h4 className={styles.groupTitle}>Machine Learning</h4>
                            <div className={styles.tags}>
                                <span>PyTorch</span>
                                <span>TensorFlow</span>
                                <span>TensorFlow.js</span>
                            </div>
                        </div>

                    </div>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.heading}>Languages</h2>
                    <hr />

                    <div className={styles.langBlock}>

                        <div className={styles.langRow}>
                            <span className={styles.langName}>Italian</span>
                            <span>Mother tongue</span>
                        </div>

                        <div className={styles.langRow}>
                            <span className={styles.langName}>English</span>
                            <div className={styles.langDetails}>
                                <span><strong>Reading:</strong> Strong comprehension of written texts</span>
                                <span><strong>Speaking:</strong> Proficient in conversational communication</span>
                                <span><strong>Listening:</strong> Full understanding of spoken language</span>
                            </div>
                        </div>

                        <div className={styles.langRow}>
                            <span className={styles.langName}>Portuguese</span>
                            <div className={styles.langDetails}>
                                <span><strong>Reading:</strong> Comprehension of written content</span>
                                <span><strong>Listening:</strong> Can follow dialogues with ease</span>
                                <span><strong>Speaking:</strong> Basic to handle most social situations</span>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>

    )
}

export default Resume
