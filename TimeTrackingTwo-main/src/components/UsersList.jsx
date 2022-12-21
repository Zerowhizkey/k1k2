import React from "react";
import { useProjects } from "../context/ProjectContext";
function UsersList(props) {
	const { users, deleteUser } = useProjects();
	const { current, handleUser } = props;
	return (
		<div>
			{users ? (
				users.map((user) => (
					<ul key={user.id}>
						<li>
							<input
								type="radio"
								value={user.id}
								onChange={handleUser}
								checked={user.id === current.user}
							/>
							{user.name}
							<button onClick={() => deleteUser(user.id)}>X</button>
						</li>
					</ul>
				))
			) : (
				<div>
					<p>No users found</p>
				</div>
			)}
		</div>
	);
}

export default UsersList;
