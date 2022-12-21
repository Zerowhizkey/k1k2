import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import { Tasks } from '@/pages';
import { InvoiceProvider } from '@/contexts/Index';
import { buildHandlers } from '../mocks/handlers';
import { setupServer } from 'msw/node';
import { beforeAll } from 'vitest';

const config = {
    baseUrl: 'https://silk-sapphire-houseboat.glitch.me',
    taskId: '26116467-35d3-4b89-9ffa-3892a0086549',
    userId: '6796f171-95b6-4543-acc2-9da1140ebb41',
    projectId: 'c4e7c09d-415d-4528-a7f7-c24afe7f330f',
    taskTitle: 'Style a page',
};
const server = setupServer(...buildHandlers(config));

beforeAll(() => server.listen());

test('Render task', async () => {
    render(
        <InvoiceProvider>
            <Tasks></Tasks>
        </InvoiceProvider>
    );

    const input = await waitFor(() => screen.getByPlaceholderText('Pick one'));
    fireEvent.change(input, {
        target: { value: config.projectId },
    });
    const task = await waitFor(() => screen.getByText(config.taskTitle));
    expect(task).toBeInTheDocument();
    screen.debug();
});

test('Delete tasks', async () => {
    render(
        <InvoiceProvider>
            <Tasks></Tasks>
        </InvoiceProvider>
    );

    const input = await waitFor(() => screen.getByPlaceholderText('Pick one'));
    fireEvent.change(input, {
        target: { value: config.projectId },
    });
    const button = screen.getByRole('button', { name: 'Remove' });
    const taskNameo = await waitFor(() => screen.getByText(config.taskTitle));

    fireEvent.click(button);
    await waitForElementToBeRemoved(taskNameo);
    expect(taskNameo).not.toBeInTheDocument();
    screen.debug();
});
