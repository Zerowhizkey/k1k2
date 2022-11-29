import { Button, Table } from '@mantine/core';
import { useInvoice } from '@/contexts/Index';
import dayjs from 'dayjs';
function Invoice() {
    const { item, deleteItem } = useInvoice();

    const handleDelete = (id: string) => {
        deleteItem('invoices', id);
    };

    const iows = item.invoices.map((invoice) => (
        <tr key={invoice.id}>
            <td>{invoice.amount} sek</td>
            <td>{invoice.customer}</td>
            <td>{invoice.status}</td>
            <td>{dayjs(invoice.due_date).format('YYYY/MM/DD')}</td>
            <td onClick={() => handleDelete(invoice.id)}>
                <Button>Remove</Button>
            </td>
        </tr>
    ));

    return (
        <Table>
            <thead>
                <tr>
                    <th>Price</th>
                    <th>Invoice Customer</th>
                    <th>Invoice Status</th>
                    <th>Invoice Due Date</th>
                </tr>
            </thead>
            <tbody>{iows}</tbody>
        </Table>
    );
}
export default Invoice;
