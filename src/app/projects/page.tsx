
import React from 'react'
import BlogPostCard from '@/components/blogposts/blogpostcard';
import { ProjectsInfo } from '@/lib/interfaces';
import { getProjectsData, } from '@/lib/projects';

const Projects = () => {
    const projectsData = getProjectsData();

    return (
        <div className='container'>
            <section>
                <h1>Blog page</h1>
                <ProjectsCards projectsData={projectsData}></ProjectsCards>
            </section>
        </div>
    )
}

export default Projects

// From blogposts
import styles from '@/components/blogposts/blogpage.module.css'

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