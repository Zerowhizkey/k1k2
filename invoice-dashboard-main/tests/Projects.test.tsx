import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import { Projects } from '@/pages';
import { InvoiceProvider } from '@/contexts/Index';
import { buildHandlers } from '../mocks/handlers';
import { setupServer } from 'msw/node';
import { beforeAll } from 'vitest';

const config = {
    baseUrl: 'https://silk-sapphire-houseboat.glitch.me',
    projectName: 'Style a website',
    userId: '6796f171-95b6-4543-acc2-9da1140ebb41',
    userName: 'Sandy',
    projectId: '123',
};
const server = setupServer(...buildHandlers(config));

beforeAll(() => server.listen());

test('Render Projects and removes', async () => {
    render(
        <InvoiceProvider>
            <Projects></Projects>
        </InvoiceProvider>
    );

    const input = await waitFor(() => screen.getByPlaceholderText('Pick one'));
    fireEvent.change(input, {
        target: { value: config.userId },
    });
    const project = await waitFor(() => screen.getByText(config.projectName));
    expect(project).toBeInTheDocument();
    // screen.debug();
});

test('Delete projects', async () => {
    render(
        <InvoiceProvider>
            <Projects></Projects>
        </InvoiceProvider>
    );

    const input = await waitFor(() => screen.getByPlaceholderText('Pick one'));
    fireEvent.change(input, {
        target: { value: config.userId },
    });
    const button = screen.getByRole('button', { name: 'Remove' });
    const projectNameso = await waitFor(() =>
        screen.getByText(config.projectName)
    );

    fireEvent.click(button);
    await waitForElementToBeRemoved(projectNameso);
    expect(projectNameso).not.toBeInTheDocument();
    screen.debug();
});
