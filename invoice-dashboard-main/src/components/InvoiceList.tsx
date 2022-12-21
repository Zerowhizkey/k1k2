import { Checkbox, NumberInput, Table } from '@mantine/core';
import dayjs from 'dayjs';
import { useInvoice } from '@/contexts/Index';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

type Props = {
    selectedUser: string;
    selectedProject: string;
};
type ProjectItem = {
    id: string;
    userId: string;
    name: string;
    color: string;
    hourly_rate: number;
};
type TaskItem = {
    id: string;
    name: string;
    time: number;
    roundedTime: number;
    selected: boolean;
};

const roundTime = (taskTimeMs: number, resolutionMinutes: number) => {
    if (resolutionMinutes > 0) {
        const roundedMinutes =
            resolutionMinutes *
            Math.ceil(taskTimeMs / (resolutionMinutes * 60 * 1000));
        return dayjs.duration(roundedMinutes, 'minutes').asHours();
    } else {
        return dayjs.duration(taskTimeMs, 'milliseconds').asHours();
    }
};

function InvoiceList({ selectedUser, selectedProject }: Props) {
    const { addInvoice, addHourly, item, deleteItem } = useInvoice();
    const [resolution, setResolution] = useState(0);
    const [price, setPrice] = useState(0);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    const handleAddHourly = (id: string) => {
        addHourly(id, price);
    };

    const handleDelete = (id: string) => {
        deleteItem('invoices', id);
    };

    const custName = item.users.find((u) => u.id === selectedUser);

    const projectItems = useMemo(() => {
        const result: ProjectItem[] = [];
        item.projects
            .filter((projects) => projects.userId === selectedUser)
            .forEach((project) => {
                result.push({
                    id: project.id,
                    userId: project.userId,
                    name: project.name,
                    color: project.color,
                    hourly_rate: project.hourly_rate,
                });
            });
        return result;
    }, [item.projects, selectedUser]);

    const taskItems = useMemo(() => {
        const result: TaskItem[] = [];
        item.tasks
            .filter((tasks) => tasks.projectId === selectedProject)
            .forEach((task) => {
                const taskTime = item.timelogs
                    .filter((time) => time.taskId === task.id)
                    .reduce((sum, curr) => {
                        return sum + (curr.timerStop - curr.timerStart);
                    }, 0);
                result.push({
                    id: task.id,
                    name: task.title,
                    time: taskTime,
                    roundedTime: roundTime(taskTime, resolution),
                    selected: selectedTasks.includes(task.id),
                });
            });
        return result;
    }, [item.tasks, item.timelogs, resolution, selectedTasks, selectedProject]);

    const selectedUserName = item.users.find(
        (user) => user.id === selectedUser
    )?.name;

    const iows = item.invoices
        .filter((i) => i.customer === selectedUserName)
        .map((invoice) => (
            <tr key={invoice.id}>
                <td>{invoice.amount} sek</td>
                <td>{invoice.customer}</td>
                <td>{invoice.status}</td>
                <td onClick={() => handleDelete(invoice.id)}>
                    <button>Remove</button>
                </td>
            </tr>
        ));

    useEffect(() => {
        const currentPrice = projectItems.find(
            (project) => project.userId === selectedUser
        );
        if (currentPrice) {
            setPrice(currentPrice.hourly_rate);
        }
    }, [projectItems, selectedProject]);

    const handleAddInvoice = () => {
        const data = {
            id: uuid(),
            status: 'ej betald',
            due_date: Date.now() + 2592000000,
            amount: total,
            customer: custName?.name || 'unknown',
            create_date: Date.now(),
        };
        addInvoice(data);
    };

    const handleSelectedTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTasks((prev) => [...prev, e.target.value]);
        }
        if (!e.target.checked) {
            setSelectedTasks((tasks) =>
                tasks.filter((task) => task !== e.target.value)
            );
        }
    };

    const total = useMemo(() => {
        const p = projectItems.find((p) => p.id === selectedProject);
        const hourlyRate = (p && p.hourly_rate) ?? 0;
        const roundTime = taskItems
            .filter((item) => item.selected)
            .reduce((sum, curr) => sum + curr.roundedTime, 0);
        const calc = hourlyRate * roundTime;
        return Math.round(calc * 100) / 100;
    }, [projectItems, selectedProject, taskItems]);

    const handleRound = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const num = parseInt(e.target.value);
        if (
            num === 0 ||
            num === 1 ||
            num === 5 ||
            num === 15 ||
            num === 30 ||
            num === 60
        ) {
            setResolution(num);
        }
    };

    return (
        <Table>
            <thead>
                <tr>
                    <th>Project</th>
                    <th>Hourly price</th>
                </tr>
            </thead>
            <tbody>
                {projectItems.map((project) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>
                            <NumberInput
                                value={price}
                                onChange={(price) => setPrice(price || 0)}
                            />
                        </td>
                        <td>
                            <button onClick={() => handleAddHourly(project.id)}>
                                Add
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>

            <thead>
                <tr>
                    <th>Task</th>
                    <th>Current time</th>
                </tr>
            </thead>
            <tbody>
                {taskItems.map((task) => (
                    <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>
                            {dayjs(task.time)
                                .subtract(1, 'hour')
                                .format('HH:mm:ss')}
                        </td>
                        <td>
                            <Checkbox
                                value={task.id}
                                onChange={handleSelectedTasks}
                            />
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <select onChange={handleRound}>
                            <option value={0}>0</option>
                            <option value={1}>1 min</option>
                            <option value={5}>5 min</option>
                            <option value={15}>15 min</option>
                            <option value={30}>30 min</option>
                            <option value={60}>60 min</option>
                        </select>
                    </td>
                    <td>
                        <button onClick={handleAddInvoice}>
                            Create Invoice
                        </button>
                    </td>
                    <td>
                        <p>Total price: {total} sek</p>
                    </td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Invoice Customer</th>
                    <th>Invoice Status</th>
                </tr>
            </thead>
            <tbody>{iows}</tbody>
        </Table>
    );
}

export default InvoiceList;
