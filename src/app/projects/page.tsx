
import React from 'react'
import BlogPostCard from '@/components/blogposts/blogpostcard';
import { ProjectsInfo } from '@/lib/interfaces';
import { getProjectsData, } from '@/lib/projects';
import styles from './page.module.css'
import PageHeader from '@/components/header/pageHeader';

const Projects = () => {
    const projectsData = getProjectsData();

    return (
        <div className='container'>
            <section>
                <PageHeader
                    backgroundImage={`/images/projectabstract.png`}
                    spanColor='#cd3232'>
                    <span>Project</span> page
                </PageHeader>
                <ProjectsCards projectsData={projectsData}></ProjectsCards>
            </section>
        </div>
    )
}

export default Projects


const ProjectsCards = ({ projectsData }: { projectsData: ProjectsInfo[] }) => {
    return (
        <div className={styles.cardContainer}>
            {
                projectsData.sort((a, b) => {
                    if (new Date(a.metadata.date) > new Date(b.metadata.date))
                        return -1
                    else
                        return 1;
                })
                    .map((post, i) => (
                        <BlogPostCard
                            key={i}
                            imageSrc={"file.svg"}
                            title={post.metadata.title}
                            href={post.url}
                            description={post.metadata.description}
                            tags={post.metadata.tags} cardStyle={'project'} />
                    ))
            }
        </div>
    )

}