import { useInvoice } from '@/contexts/Index';
import { Accordion, Button } from '@mantine/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const Timelogs = () => {
    const { item, deleteItem } = useInvoice();

    const handleDelete = (id: string) => {
        deleteItem('timelogs', id);
    };

    const timeThing = item.timelogs.filter(
        (time) =>
            dayjs(time.timerStart).isBetween(
                Date.now() - 2592000000,
                Date.now()
            ) ||
            dayjs(time.timerStop).isBetween(Date.now() - 2592000000, Date.now())
    );

    return (
        <>
            <Accordion>
                <Accordion.Item value='customization'>
                    <Accordion.Control>Time logs</Accordion.Control>

                    {item.timelogs.map((time) => (
                        <Accordion.Panel key={time.id}>
                            <p>
                                {dayjs
                                    .duration(time.timerStop - time.timerStart)
                                    .format('HH:mm:ss')}
                            </p>
                            <p>{time.id}</p>
                            <Button onClick={() => handleDelete(time.id)}>
                                Remove
                            </Button>
                        </Accordion.Panel>
                    ))}
                </Accordion.Item>
            </Accordion>
            <Accordion>
                <Accordion.Item value='customization'>
                    <Accordion.Control>
                        Time logs since :{' '}
                        {dayjs(Date.now() - 2592000000).format('DD/MM/YYYY')}
                    </Accordion.Control>

                    {timeThing.map((time) => (
                        <Accordion.Panel key={time.id}>
                            <p>
                                {dayjs
                                    .duration(time.timerStop - time.timerStart)
                                    .format('HH:mm:ss')}
                            </p>
                            <p>
                                {dayjs(time.timerStart).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                )}
                            </p>
                            <p>
                                {dayjs(time.timerStop).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                )}
                            </p>
                            <p>{time.id}</p>
                            <Button onClick={() => handleDelete(time.id)}>
                                Remove
                            </Button>
                        </Accordion.Panel>
                    ))}
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default Timelogs;
