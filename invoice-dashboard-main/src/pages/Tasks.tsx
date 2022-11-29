import { Table, Select, Button } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';

function Tasks() {
    const { item, deleteItem } = useInvoice();
    const [selectedProject, setSelectedProject] = useState('');

    const handleDelete = (id: string) => {
        deleteItem('tasks', id);
    };

    const projectsArray = useMemo(() => {
        return item.projects.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [item.projects]);

    const rows = item.tasks
        .filter((tasks) => tasks.projectId === selectedProject)
        .map((task) => (
            <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.userId}</td>
                <td onClick={() => handleDelete(task.id)}>
                    <Button>Remove</Button>
                </td>
            </tr>
        ));

    return (
        <>
            <Select
                clearable
                label='Project'
                placeholder='Pick one'
                data={projectsArray}
                value={selectedProject}
                onChange={(projectId) => setSelectedProject(projectId || '')}
            />
            {selectedProject && (
                <Table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Task id</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            )}
        </>
    );
}
export default Tasks;
