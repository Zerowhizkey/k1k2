import { NativeSelect } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';
import TaskList from '@/components/TaskList';

function Tasks() {
    const { item } = useInvoice();
    const [selectedProject, setSelectedProject] = useState('');

    const projectsArray = useMemo(() => {
        return item.projects.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [item.projects]);

    return (
        <>
            {projectsArray && projectsArray.length && (
                <NativeSelect
                    label='Project'
                    placeholder='Pick one'
                    data={projectsArray}
                    value={selectedProject}
                    onChange={(e) => {
                        setSelectedProject(e.target.value || '');
                    }}
                />
            )}

            <TaskList selectedProject={selectedProject} />
        </>
    );
}
export default Tasks;
