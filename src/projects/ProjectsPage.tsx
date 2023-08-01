import React, { Fragment, useState, useEffect } from "react";
import { MockProjects } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { projectAPI } from "./projectApi";

function ProjectsPage() {

    //const [projects, setProjects] = useState<Project[]>(MockProjects);
    const [projects, setProjects] = useState<Project[]>([]); // empty array
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError(undefined);
                setLoading(false);
                setProjects(data);
                if (currentPage === 1) {

                    setProjects(data);
                } else {
                    setProjects((prevProjects) => [...projects, ...data]);

                }

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);

    const saveProject = (project: Project) => {
        projectAPI
            .put(project)
            .then((updatedProject) => {
                let updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? new Project(updatedProject) : p;
                });
                setProjects(updatedProjects);
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    };

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    return (
        <Fragment>
            <h1>Projects</h1>
            {error && (
                <div className="row">
                    <section>
                        <p className="error">
                            <span className="icon-alert inverse"></span>
                            {error}
                        </p>
                    </section>
                </div>
            )}
            <ProjectList projects={projects} onSave={saveProject} />

            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More..
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                </div>
            )}
        </Fragment>
    );
}

export default ProjectsPage;