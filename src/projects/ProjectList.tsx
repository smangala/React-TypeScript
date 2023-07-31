import React from "react";
import { Project } from "./Project";

interface ProjectListProps {
    projects: Project[];
}

function ProjectList({ projects}: ProjectListProps) {
  return (
    <div className="row">
        {projects.map((project) => (
            <div className="cols-sm" key={project.id}>
                <div className="card">
                    <img src={project.imageUrl} alt={project.name} />
                    <section className="section dark">
                        <h5 className="strong">{project.name}</h5>
                        <p>{project.description}</p>
                        <p>Budget: {project.budget}</p>
                    </section>
                </div>
            </div>
        ))}
    </div>
  );
}

export default ProjectList;