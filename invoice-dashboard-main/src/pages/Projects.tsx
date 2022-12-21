import { NativeSelect, Select } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { useMemo, useState } from 'react';
import ProjectList from '@/components/ProjectList';

function Projects() {
    const { item } = useInvoice();
    const [selectedUser, setSelectedUser] = useState('');

    const usersArray = useMemo(() => {
        return item.users.map(({ id, name }) => ({
            value: id,
            label: name,
        }));
    }, [item.users]);

    console.log('usersArray', usersArray);

    return (
        <>
            {usersArray && usersArray.length && (
                <NativeSelect
                    aria-hidden='false'
                    label='Users'
                    placeholder='Pick one'
                    data={usersArray}
                    value={selectedUser}
                    onChange={(e) => {
                        setSelectedUser(e.target.value || '');
                    }}
                />
            )}
            <ProjectList selectedUser={selectedUser} />
        </>
    );
}
export default Projects;
