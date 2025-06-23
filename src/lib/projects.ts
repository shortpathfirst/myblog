import { ProjectsInfo } from "./interfaces";
import projectsData from "@/content/projects.json"

export function getProjectsData(): ProjectsInfo[] {
    projectsData.sort((a, b) => {
        if (new Date(a.metadata.date) > new Date(b.metadata.date)) return -1
        else return 1;
    });
    return projectsData as ProjectsInfo[];
}
