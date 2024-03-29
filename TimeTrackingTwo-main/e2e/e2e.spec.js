import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('listitem').filter({ hasText: 'SandyX' }).getByRole('radio').check();
  await page.getByRole('listitem').filter({ hasText: 'LindaX' }).getByRole('radio').check();
  await page.getByRole('listitem').filter({ hasText: 'SandyX' }).getByRole('radio').check();
  await page.getByRole('link', { name: 'Overview' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('project');
  await page.locator('input[type="color"]').click();
  await page.getByText('Add a projectAdd').click();
  await page.locator('input[type="color"]').click();
  await page.locator('input[type="color"]').fill('#c7e105');
  await page.getByText('heheheX').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('listitem').filter({ hasText: 'projectX' }).getByRole('radio').check();
  await page.getByTestId('btn2').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('taski');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('radio').check();
  await page.getByRole('link', { name: 'Timer' }).click();
  await page.getByText('taski 00:00:00').click();
  await page.locator('svg').nth(1).click();
  await page.locator('svg').nth(1).click();
  await page.getByRole('link', { name: 'Calendar' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('heading', { name: 'Calendar' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().dblclick();
  await page.getByRole('textbox').first().click({
    clickCount: 3
  });
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().press('ArrowLeft');
  await page.getByRole('textbox').first().press('ArrowLeft');
  await page.getByRole('textbox').first().press('ArrowLeft');
  await page.getByRole('textbox').first().press('ArrowRight');
  await page.getByRole('textbox').first().press('ArrowRight');
  await page.getByRole('textbox').first().press('ArrowLeft');
  await page.getByRole('textbox').first().press('ArrowRight');
  await page.getByRole('textbox').first().press('ArrowLeft');
  await page.getByRole('textbox').first().fill('2022-12-21T12:00');
  await page.getByRole('textbox').first().press('Tab');
  await page.getByRole('textbox').nth(1).press('ArrowRight');
  await page.getByRole('textbox').nth(1).press('ArrowRight');
  await page.getByRole('textbox').nth(1).press('ArrowLeft');
  await page.getByRole('textbox').nth(1).press('ArrowRight');
  await page.getByRole('textbox').nth(1).press('ArrowLeft');
  await page.getByRole('textbox').nth(1).fill('2022-12-21T23:00');
  await page.getByText('UsersCalendartaski4b4a7546-0599-4c89-8c7a-87f76891c91400:00:06Overview/Calendar/').click();
  await page.getByText('00:00:06').click();
  await page.getByText('4b4a7546-0599-4c89-8c7a-87f76891c914').click();
  await page.getByRole('heading', { name: 'taski' }).click();
  await page.getByRole('link', { name: 'Timer' }).click();
  await page.getByRole('link', { name: 'Overview' }).click();
});