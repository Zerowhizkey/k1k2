import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useProjects } from "../context/ProjectContext";
import ProjectList from "./ProjectList";

const Projects = () => {
	const [name, setName] = useState("");
	const [color, setColor] = useState("");

	const { current, dispatchCurrent, projects, addProject, deleteProject } =
		useProjects();

	const handleAddProject = async () => {
		const projectData = {
			id: uuid(),
			userId: current.user,
			name: name,
			color: color,
		};
		await addProject(projectData);
	};

	const handleProject = (e) => {
		dispatchCurrent({ type: "project", id: e.target.value });
	};

	return (
		<div>
			<h6>Projects</h6>
			<ProjectList current={current} handleProject={handleProject} />
			<div>
				<p>Add a project</p>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<input type="color" onChange={(e) => setColor(e.target.value)} />
				<button onClick={handleAddProject}>Add</button>
			</div>
		</div>
	);
};

export default Projects;
