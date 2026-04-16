
import React from 'react'
import BlogPostCard from '@/components/blogposts/blogpostcard';
import { getProjectsData, } from '@/lib/projects';
import styles from './page.module.css'
import PageHeader from '@/components/header/pageHeader';
import { Metadata } from 'next';
import { ProjectsInfo } from '@/lib/interfaces';
import projectabstract from '@/assets/images/projectabstract.png'
import filesvg from '@/assets/file.svg'

export const metadata: Metadata = {
    title: 'Projects page',
    description: 'Page with a list of personal projects',
}

const Projects = () => {
    const projectsData: ProjectsInfo[] = getProjectsData();

    return (
        <section className='container'>
            <PageHeader
                backgroundImage={projectabstract}
                spanColor='#cd3232'>
                <span>Project</span> page
            </PageHeader>

            <div className={styles.cardContainer}>
                {
                    projectsData.map((post, i) => (
                        <BlogPostCard
                            key={i}
                            imageSrc={post.metadata.thumbnail || filesvg}
                            title={post.metadata.title}
                            href={post.url}
                            description={post.metadata.description}
                            tags={post.metadata.tags}
                            cardStyle={'project'} />
                    ))
                }
            </div>
        </section>
    )
}

export default Projects