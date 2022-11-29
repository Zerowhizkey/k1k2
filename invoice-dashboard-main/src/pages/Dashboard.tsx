import { useState, useMemo } from 'react';
import { useListState } from '@mantine/hooks';
import { Button } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/components/StrictModeDroppable';
import dayjs from 'dayjs';
import DashItem from '@/components/DashItem';

function Dashboard() {
    const { item } = useInvoice();
    const [show, setShow] = useState<Record<string, boolean>>({});

    const all = item.invoices
        .filter((invoice) =>
            dayjs(invoice.create_date).isBetween(
                new Date().getFullYear(),
                Date.now()
            )
        )
        .map((i) => i.amount);

    const itemLabels = {
        users: 'Users',
        projects: 'Projects',
        tasks: 'Tasks',
        invoices: 'Invoices',
        total: 'Total time',
        calcAll: 'Total amount on invoices',
    };

    const itemLength = useMemo(() => {
        return {
            users: item.users.length,
            projects: item.projects.length,
            tasks: item.tasks.length,
            invoices: item.invoices.length,
            total: (
                <p>
                    {' '}
                    Total logged time since{' '}
                    {dayjs().subtract(30, 'days').format('YYYY MM:DD')}:{' '}
                    {dayjs
                        .duration(
                            item.timelogs
                                .filter(
                                    (time) =>
                                        dayjs(time.timerStart).isBetween(
                                            Date.now() - 2592000000,
                                            Date.now()
                                        ) ||
                                        dayjs(time.timerStop).isBetween(
                                            Date.now() - 2592000000,
                                            Date.now()
                                        )
                                )
                                .map((time) => time)
                                .reduce((sum, curr) => {
                                    return (
                                        sum + (curr.timerStop - curr.timerStart)
                                    );
                                }, 0)
                        )
                        .format('HH:mm:ss')}
                </p>
            ),
            calcAll: (
                <p>
                    Total since {dayjs().startOf('year').format('YYYY')}:{' '}
                    {Math.round(
                        all.reduce((acc, value) => {
                            return acc + value;
                        }, 0) * 100
                    ) / 100}{' '}
                    sek
                </p>
            ),
        };
    }, [item.users, item.projects, item.tasks, item.invoices]);

    const [state, handlers] = useListState<keyof typeof itemLabels>([
        'users',
        'projects',
        'tasks',
        'invoices',
        'total',
        'calcAll',
    ]);

    const items = state.map((state, index) => (
        <DashItem
            key={state}
            index={index}
            draggableId={state}
            show={show[state]}
        >
            {itemLength[state]}
        </DashItem>
    ));

    return (
        <>
            {state.map((state) => (
                <Button
                    style={{ margin: '10px' }}
                    key={state}
                    onClick={() =>
                        setShow({
                            ...show,
                            [state]: !show[state],
                        })
                    }
                >
                    {itemLabels[state]}
                </Button>
            ))}

            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    handlers.reorder({
                        from: source.index,
                        to: destination?.index || 0,
                    })
                }
            >
                <StrictModeDroppable
                    droppableId='dnd-list'
                    direction='vertical'
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </>
    );
}
export default Dashboard;
