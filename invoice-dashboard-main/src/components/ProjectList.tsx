import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';

type Props = {
    selectedUser: string;
};

function ProjectList({ selectedUser }: Props) {
    const { deleteItem, item } = useInvoice();

    const handleDelete = (id: string) => {
        deleteItem('projects', id);
    };

    const rows = item.projects
        .filter((project) => project.userId === selectedUser)
        .map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.userId}</td>

                <td onClick={() => handleDelete(project.id)}>
                    <button>Remove</button>
                </td>
            </tr>
        ));

    console.log(selectedUser, item);

    return selectedUser !== '' ? (
        <Table>
            <thead>
                <tr>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    ) : (
        <p>No Projects</p>
    );
}

export default ProjectList;
