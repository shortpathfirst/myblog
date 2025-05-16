import { ProjectsInfo, Tag } from "./interfaces";
import projectsData from "@/content/projects.json"

export function getProjectsData(): ProjectsInfo[] {
    return projectsData as ProjectsInfo[];
}
