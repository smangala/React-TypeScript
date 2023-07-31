import React from "react";
import { MockProjects } from "./MockProjects";
import ProjectList from "./ProjectList";

function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={MockProjects} />
    </div>
  );
}

export default ProjectsPage;