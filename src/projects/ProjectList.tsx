import React, {useState} from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave}: ProjectListProps) {

    const [projectBeingEdited, setProjectBeingEdited] = useState<Project | undefined>(undefined);

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project); 
    };

    const cancelEdit = () => {
        setProjectBeingEdited({} as Project);
    };

    return (
        <div className="row">
            {projects.map((project) => (
                <div className="cols-sm" key={project.id}>
                    {project === projectBeingEdited ? (
                        <ProjectForm project={project} onCancel={cancelEdit} onSave={onSave}/>
                    ) : (
                        <ProjectCard project={project} onEdit={handleEdit} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProjectList;