import { Table } from '@mantine/core';
import { render, screen } from '@testing-library/react';
describe('Table', () => {
    it('Teble render items', () => {
        render(
            <Table>
                <thead>
                    <tr>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prices</td>
                    </tr>
                </tbody>
            </Table>
        );
        const tableHeadText = screen.getByText('Price');
        const tableBodyText = screen.getByText('Prices');
        // screen.debug();
        expect(tableHeadText).toBeInTheDocument();
        expect(tableBodyText).toBeInTheDocument();
    });
});
