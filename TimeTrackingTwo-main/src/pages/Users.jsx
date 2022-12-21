import { useProjects } from "../context/ProjectContext";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
	const [name, setName] = useState("");
	const { users, addUser, deleteUser, dispatchCurrent, current } =
		useProjects();

	const handleAddUser = async () => {
		const userData = {
			id: uuid(),
			name: name,
		};
		await addUser(userData);
	};

	const handleUser = (e) => {
		dispatchCurrent({ id: e.target.value, type: "user" });
	};

	return (
		<div>
			<h4>Users</h4>
			<UsersList current={current} handleUser={handleUser} />
			<div>
				<p>Create a user</p>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<button onClick={handleAddUser}>Create</button>
			</div>
		</div>
	);
};

export default Users;
