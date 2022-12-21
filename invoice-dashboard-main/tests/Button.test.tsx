import { Button } from '@mantine/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
describe('Button', () => {
    it('Clickable', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const textButton = screen.getByText('Click me');
        screen.debug();
        fireEvent.click(textButton);
        expect(handleClick).toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalledTimes(2);
    });
});
