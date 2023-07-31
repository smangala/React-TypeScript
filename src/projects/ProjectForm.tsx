import React, {SyntheticEvent, useState} from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    project: Project;
    onSave: (project: Project) => void;
    onCancel: () => void;
}

function ProjectForm({
    project: initialProject, 
    onSave, 
    onCancel}: ProjectFormProps) {
        const [project, setProject] = useState<Project>(initialProject);
        const [errors, setErrors] = useState({
            name: "",
            description: "",
            budget: "",
        })

        const handleSubmit = (event: SyntheticEvent) => {
            event.preventDefault();
            if (!isValid()) return;
            onSave(project);
        };

        const handleChange = (event: SyntheticEvent) => {
            const {type, name, value, checked} = event.target as HTMLInputElement;
            let updatedValue = type === "checkbox" ? checked : value;

            if (type === "number") {
                updatedValue = updatedValue;
            }
            const change = {[name]: updatedValue};

            let updatedProject: Project;
            setProject((prevProject) => {
                updatedProject = new Project({...prevProject, ...change});
                return updatedProject;
            });
            setErrors(() => validate(updatedProject));
        };

        function validate(project: Project) {
            let errors: any = {
                name: "",
                description: "",
                budget: "",
            };
            
            if  (project.name.length === 0) {
                errors.name = "Name is required";
            }
            if (project.name.length > 0 && project.name.length < 3) {
                errors.name = "Name must be at least 3 characters";
            }
            if (project.description.length === 0) {
                errors.description = "Description is required";
            }
            if (project.budget === 0) {
                errors.budget = "Budget must be greater than $0";
            }
            return errors;
        }

        function isValid() {
            return (
                errors.name.length === 0 &&
                errors.description.length === 0 &&
                errors.budget.length === 0
            );
        }


        return (
            <form className="input-group vertical" onSubmit={handleSubmit}>
                <label htmlFor="name">Project Name:</label>
                <input 
                    type="text" 
                    id="name" name="name" 
                    placeholder="Enter Project Name" 
                    value={project.name} 
                    onChange={handleChange} />
                {errors.name.length > 0 && 
                    <div className="error">{errors.name}</div>
                }
                <label htmlFor="description">Project Description:</label>
                <textarea 
                    id="description" name="description" 
                    placeholder="Enter Project Description" 
                    value={project.description} 
                    onChange={handleChange}/>
                {errors.description.length > 0 &&
                    <div className="error">{errors.description}</div>
                }
                <label htmlFor="budget">Project Budget:</label>
                <input type="number" id="budget" name="budget" placeholder="Enter Project Budget"value={project.budget} onChange={handleChange}/>
                <label htmlFor="isActive">Is Project Active?</label>
                <input type="checkbox" id="isActive" name="isActive" defaultChecked/>

                <div className="input-group">
                    <button type="submit" className="primary bordered medium">Save</button>
                    <span> | </span>
                    <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
}


export default ProjectForm;