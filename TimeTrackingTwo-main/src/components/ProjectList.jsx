import React from "react";
import { useProjects } from "../context/ProjectContext";
function ProjectList(props) {
	const { projects, deleteProject } = useProjects();
	const { current, handleProject } = props;

	return (
		<div>
			{projects ? (
				projects.map((project) => (
					<ul key={project.id}>
						<li>
							<input
								type="radio"
								value={project.id}
								onChange={handleProject}
								checked={project.id === current.project}
							/>
							{project.name}
							<button onClick={() => deleteProject(project.id)}>X</button>
						</li>
					</ul>
				))
			) : (
				<p>No projects</p>
			)}
		</div>
	);
}

export default ProjectList;
