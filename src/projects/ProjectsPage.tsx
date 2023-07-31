import React, {Fragment, useState} from "react";
import { MockProjects } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

function ProjectsPage() {

    const [projects, setProjects] = useState<Project[]>(MockProjects);

    const saveProject = (project: Project) => {
        let updatedProjects = projects.map((p) => {
            return p.id === project.id ? project : p;
        }
        );
        setProjects(updatedProjects);
    };

    return (
        <div>
        <h1>Projects</h1>
        <ProjectList projects={projects} onSave={saveProject}/>
        </div>
    );
}

export default ProjectsPage;