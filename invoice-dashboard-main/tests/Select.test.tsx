import { Select } from '@mantine/core';
import { render, screen } from '@testing-library/react';
describe('select', () => {
    it('Does select work', async () => {
        render(
            <Select
                defaultValue={'react'}
                label='Your favorite framework/library'
                placeholder='Pick one'
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
            />
        );

        screen.debug();
        expect(
            screen.getByLabelText('Your favorite framework/library')
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('react')).toBeInTheDocument();
    });
});
