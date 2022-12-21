import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.doMock('@/contexts/Index.tsx', () => {
    const mockedState = {
        loading: false,
        item: {
            users: [],
            projects: [
                {
                    id: '1',
                    userId: '123',
                    name: 'build something',
                    color: 'cool',
                    hourly_rate: 123,
                },
            ],
            tasks: [],
            timelogs: [],
            invoices: [],
        },
    } as unknown as InvoiceContext;
    return {
        useInvoice: () => mockedState,
    };
});
import ProjectList from '@/components/ProjectList';

describe('Project list', () => {
    it('renders provided projects', async () => {
        render(<ProjectList selectedUser='123' />);
        screen.debug();
        const project = await waitFor(() =>
            screen.getByText('build something')
        );
        expect(project).toBeInTheDocument();
    });
    it('Prints out no project if no project exists', async () => {
        render(<ProjectList selectedUser='' />);
        screen.debug();
        expect(screen.getByText('No Projects')).toBeInTheDocument();
    });
});
