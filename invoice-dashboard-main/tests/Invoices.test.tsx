import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import { InvoiceOverview } from '@/pages';
import { InvoiceProvider } from '@/contexts/Index';
import { buildHandlers } from '../mocks/handlers';
import { setupServer } from 'msw/node';
import { beforeAll } from 'vitest';

const config = {
    baseUrl: 'https://silk-sapphire-houseboat.glitch.me',
    userId: '6796f171-95b6-4543-acc2-9da1140ebb41',
    userName: 'Sandy',
    projectName: 'Style a website',
    projectId: 'c4e7c09d-415d-4528-a7f7-c24afe7f330f',
    taskTitle: 'Style a page',
    taskId: '26116467-35d3-4b89-9ffa-3892a0086549',
    amount: 123,
};
const server = setupServer(...buildHandlers(config));

beforeAll(() => server.listen());

test('Render invoices', async () => {
    render(
        <InvoiceProvider>
            <InvoiceOverview></InvoiceOverview>
        </InvoiceProvider>
    );

    const inputP = await waitFor(() => screen.getByPlaceholderText('Pick one'));
    fireEvent.change(inputP, {
        target: { value: config.userId },
    });
    // const project = await waitFor(() => screen.getAllByText(config.projectName));
    // expect(project).toBeInTheDocument();

    const inputT = await waitFor(() =>
        screen.getByPlaceholderText('Pick another')
    );
    fireEvent.change(inputT, {
        target: { value: config.projectId },
    });
    const task = await waitFor(() => screen.getByText(config.taskTitle));
    expect(task).toBeInTheDocument();

    const check = await waitFor(() => screen.getByRole('checkbox'));
    fireEvent.click(check);
    expect(check).toBeChecked();
    const create = await waitFor(() =>
        screen.getByRole('button', { name: 'Create Invoice' })
    );
    fireEvent.click(create);
    const price = await waitFor(() =>
        screen.getByText(`${config.amount} sek`)
    );
    expect(price).toBeInTheDocument();
    screen.debug();
});

// test('Delete tasks', async () => {
//     render(
//         <InvoiceProvider>
//             <Tasks></Tasks>
//         </InvoiceProvider>
//     );

//     const input = await waitFor(() => screen.getByPlaceholderText('Pick one'));
//     fireEvent.change(input, {
//         target: { value: config.projectId },
//     });
//     const button = screen.getByRole('button', { name: 'Remove' });
//     const taskNameo = await waitFor(() => screen.getByText(config.taskTitle));

//     fireEvent.click(button);
//     await waitForElementToBeRemoved(taskNameo);
//     expect(taskNameo).not.toBeInTheDocument();
//     screen.debug();
// });
