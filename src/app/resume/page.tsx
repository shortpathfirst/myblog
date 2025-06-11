import React from 'react'
import styles from './page.module.css'

const Resume = () => {

    return (
        <div className={styles.resumeSection}>
            {/* Download sidebar */}
            <div className={styles.sidebar}>
                <h1>Resume</h1>
                <a className={styles["download-btn"]}  href="/myblog/resume.pdf" target="_blank">Download</a>
            </div>
            {/* Content */}
            <div className={styles.resumeContent}>
                <p className={styles.resumeTitle}>
                    Software Engineer 👩🏻‍💻 | Data Analyst 📈 | Data visualization 🎨
                </p>
                <hr />

                <h3>Education</h3>
                <div className={styles.grid}>
                    <p><strong>B.S. Computer Engineer</strong><br />Degree score: 90 | 110<br />Università degli studi di Perugia, PG <br />Aug 2014 – Dec 2018</p>
                    <p><strong>M.S. Data Science</strong><br />-<br />Università degli studi di Perugia, PG<br />Aug 2019 – May 2022</p>
                </div>
                <hr />


                <h3>Expertise area</h3>
                <div>
                    <p>
                        Computer Engineer with a passion for full-stack web development, machine learning, and data-driven applications.
                        I like building responsive, user-friendly web interfaces using React, Angular and developing robust backend systems with Java, Express.js, and MongoDB/SQL databases.
                    </p>
                    <p>
                        I have good Understanding in designing scalable architectures, knowledge on the principale AWS services and the use of containerization with Docker for application deployment and management.
                    </p>
                    <p> My main idea is writing clean and maintainable code and applying software engineering best practices including design patterns, type safety, respecting algorithmic complexity, applying version control. Strong foundation in algorithms, data structures, and system design, for providing a secure application development.</p>
                    <p>
                        Proficient in machine learning and data analysis using Python and libraries like TensorFlow. From creating a data foundation with web scraping data to performing EDA (Exploratory Data Analysis) and building predictive models. Creating insightful, interactive data visualizations transforming complex datasets into clear visual stories.
                    </p>
                </div>
                <hr />
                <h3>Projects</h3>
                <div className={styles.grid}>

                    {
                        [
                            {
                                "name": "Crimes Dashboard",
                                "date": "December 2024 - February 2025",
                                "isSite": true,
                                "url": "https://github.com/shortpathfirst/MapDashboard",
                                "descriptionList": [
                                    "A <strong>React</strong> dashboard with the use of  <strong>Chackra UI</strong>.",
                                    "<strong>ExpressJS</strong> backend serving the crimes data to showcase",
                                    "To navigate the crimes of the City of Belém - Brazil in a modern site"
                                ]
                            },
                            {
                                "name": "Judo Club",
                                "date": "August 2024 - September 2024",
                                "isSite": false,
                                "url": "https://github.com/shortpathfirst/judoclub",
                                "descriptionList": [
                                    "SPA application written in <strong>Angular</strong> for a judo club. ",
                                    "<strong>Interactive learning</strong> using data visualization libray and angular features."
                                ]
                            }
                        ].map((project, i) => (
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
                <hr />
                <h3>💻 Technical Skills</h3>
                <div className={styles.tecnicalskill}>
                    <h4>Languages:</h4>
                    <p>
                        <code>JavaScript</code> ·
                        <code>TypeScript</code> ·
                        <code>Java</code> ·
                        <code>Python</code> ·
                        <code>HTML</code> ·
                        <code>CSS</code> ·
                    </p>

                    <h4>Frontend Development:</h4>
                    <p>
                        <code>React</code> ·
                        <code>Next.js</code> ·
                        <code>Angular</code> ·
                    </p>

                    <h4>Backend & APIs:</h4>
                    <p>
                        <code>Express.js</code> ·
                        <code>MongoDB</code> ·
                        <code>PostgreSQL</code> ·
                        <code>SQLite</code> ·
                        <code>Swagger</code> ·
                        <code>Postman</code>
                    </p>

                    <h4>Data Science & Machine Learning:</h4>
                    <p>
                        <code>Python</code> ·
                        <code>PyTorch</code> ·
                        <code>TensorFlow.js</code> ·
                        <code>Apache Spark</code>
                    </p>

                    <h4>Data Visualization:</h4>
                    <p>
                        <code>D3.js</code> ·
                        <code>Chart.js</code>
                    </p>

                    <h4>DevOps & Tools:</h4>
                    <p>
                        <code>Git</code> ·
                        <code>GitHub</code> ·
                        <code>Docker</code> ·
                        <code>Vite</code> ·
                        <code>QGIS</code>
                    </p>
                </div>
                <hr />
                <h3>Languages</h3>
                <ul>
                    <li><strong>Italian:</strong> Mothertongue</li>
                    <li><strong>English:</strong>
                        <ul>
                            <li><strong>Reading:</strong> Strong comprehension of written texts</li>
                            <li><strong>Speaking:</strong> Proficient in conversional comunication  </li>
                            <li><strong>Listening:</strong> Full understanding of spoken language</li>
                        </ul>
                    </li>

                    <li><strong>Portuguese:</strong>
                        <ul>
                            <li><strong>Reading:</strong> Moderate ability to understand written content</li>
                            <li><strong>Listening:</strong> Can follow dialogues with ease</li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>

    )
}

export default Resume
