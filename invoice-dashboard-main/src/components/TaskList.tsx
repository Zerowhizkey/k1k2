import { Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';

type Props = {
    selectedProject: string;
};

function TaskList({ selectedProject }: Props) {
    const { item, deleteItem } = useInvoice();

    const handleDelete = (id: string) => {
        deleteItem('tasks', id);
    };

    const rows = item.tasks
        .filter((tasks) => tasks.projectId === selectedProject)
        .map((task) => (
            <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.userId}</td>
                <td onClick={() => handleDelete(task.id)}>
                    <button>Remove</button>
                </td>
            </tr>
        ));

    return selectedProject !== '' ? (
        <Table>
            <thead>
                <tr>
                    <th>Task Title</th>
                    <th>User id</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    ) : (
        <p>No Tasks</p>
    );
}

export default TaskList;
