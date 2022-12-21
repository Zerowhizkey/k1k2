import { Accordion } from '@mantine/core';
import { render, screen } from '@testing-library/react';
describe('Accordion', () => {
    it('Does Accordion render items', async () => {
        render(
            <Accordion>
                <Accordion.Item value='time'>
                    <Accordion.Control>Time logs</Accordion.Control>
                    <Accordion.Panel>
                        <p>Poo</p>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        );
        const accordionControlText = screen.getByText("Time logs");
        const accordionPanelText = screen.getByText('Poo');
        screen.debug();
        expect(accordionControlText).toBeInTheDocument();
        expect(accordionPanelText).toBeInTheDocument();
    });
});
