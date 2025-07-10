import { test, expect } from '@playwright/test';
let page;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByRole('textbox', {name: 'password'}).fill('secret_sauce');
    await page.locator('xpath = /html/body/div/div/div[2]/div[1]/div/div/form/input').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.app_logo', { hasText: 'Swag Labs' })).toBeVisible();
    await page.waitForTimeout(1000);});

test('Add to cart', { tag: ['@withHooks'] },
    async ({  }) => {
    await page.locator('xpath = /html/body/div/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]/button').click();})
