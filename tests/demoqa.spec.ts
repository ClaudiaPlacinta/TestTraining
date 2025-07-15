import { test, expect } from '@playwright/test';

let page;

test.beforeEach(async ({ browser }) => {    page = await browser.newPage();
    await page.goto('https://demoqa.com/automation-practice-form');
    await expect(page.locator('.app_logo', { hasText: 'Practice Form' })).toBeVisible();
    await page.waitForTimeout(1000);

    // await page.getByPlaceholder('Username').fill('standard_user');
    // await page.getByRole('textbox', {name: 'password'}).fill('secret_sauce');
});