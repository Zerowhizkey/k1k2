import { Table, Select, Button } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';

function Projects() {
    const { deleteItem, item } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');

    const handleDelete = (id: string) => {
        deleteItem('projects', id);
    };

    const usersArray = useMemo(() => {
        return item.users.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [item.users]);

    const tows = item.tasks.filter((t) => t.userId === selectedUser).length;

    const rows = item.projects
        .filter((project) => project.userId === selectedUser)
        .map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.userId}</td>
                <td>{tows}</td>

                <td onClick={() => handleDelete(project.id)}>
                    <Button>Remove</Button>
                </td>
            </tr>
        ));

    return (
        <>
            <Select
                clearable
                label='Users'
                placeholder='Pick one'
                data={usersArray}
                value={selectedUser}
                onChange={(userId) => setSelectedUser(userId || '')}
            />
            {selectedUser && (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Project id</th>
                                <th>Tasks</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </>
            )}
        </>
    );
}
export default Projects;
