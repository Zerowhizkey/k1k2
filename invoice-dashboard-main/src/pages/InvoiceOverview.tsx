import { NativeSelect } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import InvoiceList from '@/components/InvoiceList';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);

type ProjectItem = {
    id: string;
    userId: string;
    name: string;
    color: string;
    hourly_rate: number;
};

const InvoiceOverview = () => {
    const { item } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProject, setSelectedProject] = useState('');

    const usersArray = useMemo(() => {
        return item.users.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [item.users]);

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

    const projectsArray = useMemo(() => {
        return projectItems
            .filter((project) => project.userId === selectedUser)
            .map(({ id, name }) => ({
                value: id,
                label: name,
            }));
    }, [projectItems, selectedUser]);

    return (
        <>
            {usersArray && usersArray.length && (
                <NativeSelect
                    label='Users'
                    placeholder='Pick one'
                    data={usersArray}
                    value={selectedUser}
                    onChange={(e) => {
                        setSelectedUser(e.target.value || '');
                        setSelectedProject('');
                    }}
                />
            )}
            {selectedUser && projectsArray && projectsArray.length && (
                <NativeSelect
                    label='Project'
                    placeholder='Pick another'
                    data={projectsArray}
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value || '')}
                />
            )}

            <InvoiceList
                selectedUser={selectedUser}
                selectedProject={selectedProject}
            />
        </>
    );
};

export default InvoiceOverview;
