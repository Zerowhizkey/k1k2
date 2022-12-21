import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page
        .getByText(
            'UsersProjectsTasksInvoicesTotal timeTotal amount on invoices'
        )
        .click();
    await page.getByRole('button', { name: 'Users' }).click();
    await page.getByRole('button', { name: 'Users' }).first().click();
    await page.getByRole('button', { name: 'Projects' }).click();
    await page.getByRole('button', { name: 'Projects' }).first().dblclick();
    await page.getByRole('button', { name: 'Users' }).click();
    await page.getByRole('button', { name: 'Tasks' }).click();
    await page.getByRole('button', { name: 'Invoices' }).first().click();
    await page.getByRole('button', { name: 'Total time' }).click();
    await page
        .getByRole('button', { name: 'Total amount on invoices' })
        .click();
    await page.getByRole('button', { name: 'Users' }).first().click();
    await page.getByRole('button', { name: 'Total time' }).click();
    await page.getByRole('button', { name: 'Tasks' }).first().click();
    await page.getByRole('button', { name: 'Projects' }).first().click();
    await page.getByRole('button', { name: 'Invoices' }).first().click();
    await page
        .getByRole('button', { name: 'Total amount on invoices' })
        .click();
    await page.getByRole('link', { name: 'Projects' }).click();
    await page
        .getByRole('combobox', { name: 'Users' })
        .selectOption('99132727-8daa-4c50-ab7e-cae569a88c9f');
    await page
        .getByRole('combobox', { name: 'Users' })
        .selectOption('115f62a6-3cc9-4cfc-a71b-b50fb54b6956');
    await page
        .getByRole('cell', { name: 'Build something bulletproof' })
        .click();
    await page
        .getByRole('combobox', { name: 'Users' })
        .selectOption('4778b1fc-7a5e-4f4c-8b0d-f397d76af455');
    await page
        .getByRole('combobox', { name: 'Users' })
        .selectOption('6796f171-95b6-4543-acc2-9da1140ebb41');
    await page.getByRole('link', { name: 'Tasks' }).click();
    await page
        .getByRole('combobox', { name: 'Project' })
        .selectOption('246d4fcd-85fe-4c1c-8315-3837bdaddd82');
    await page.getByRole('main').click();
    await page.getByRole('link', { name: 'Timelogs' }).click();
    // await page
    //     .getByRole('button', { name: 'Time logs since : 20/11/2022' })
    //     .click();
    // await page
    //     .getByRole('button', { name: 'Time logs since : 20/11/2022' })
    //     .click();
    await page.getByRole('link', { name: 'Invoice Dashboard' }).click();
    await page
        .getByRole('combobox', { name: 'Users' })
        .selectOption('99132727-8daa-4c50-ab7e-cae569a88c9f');
    await page
        .getByRole('combobox', { name: 'Users' })
        .selectOption('6796f171-95b6-4543-acc2-9da1140ebb41');
    await page
        .getByRole('combobox', { name: 'Project' })
        .selectOption('20b23c78-4281-4533-a616-b1b55485afe4');
    await page
        .getByRole('combobox', { name: 'Project' })
        .selectOption('c4e7c09d-415d-4528-a7f7-c24afe7f330f');
    await page
        .getByRole('row', { name: 'Create Invoice Total price: 0 sek' })
        .getByRole('combobox')
        .selectOption('15');
    await page.getByRole('button', { name: 'Create Invoice' }).click();
    await page
        .getByRole('row', { name: '0 sek Sandy ej betald Remove' })
        .getByRole('cell', { name: '0 sek' })
        .click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await page.getByRole('link', { name: 'Invoice' }).nth(1).click();
    await page.locator('tr:nth-child(5) > td:nth-child(3)').click();
    await page.getByRole('link', { name: 'Dashboard' }).first().click();
});
