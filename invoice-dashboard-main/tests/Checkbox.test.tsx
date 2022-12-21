import { Checkbox } from '@mantine/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
describe('Checkbox', () => {
    it('Checkbox is checked or not', () => {
        const handleClick = vi.fn();
        render(<Checkbox value='checks' onClick={handleClick} />);
        const check = screen.getByDisplayValue('checks');
        screen.debug();
        fireEvent.click(check);
        expect(handleClick).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalledTimes(2);
    });
});
