import { test, expect } from '@playwright/test';

let page;

test.beforeEach(async ({ browser }) => {    page = await browser.newPage();
    await page.goto('https://demoqa.com/automation-practice-form');
    await expect(page.locator('.app_logo', { hasText: 'Practice Form' })).toBeVisible();
    await page.waitForTimeout(1000);

test('Fill first name, last name and email', { tag: ['@withHooks'] },async ({  }) => {
    await page.getByPlaceholder('First Name').fill('Ana');
    await page.getByPlaceholder('Last Name').fill('Banana');
    await page.getByPlaceholder('name@example.com').fill('anabanana@gmail.com');
    });

test('Select the gender', { tag: ['@withHooks'] },async ({  }) => {
        await page.locator('//label[text()="Female"]').click();    // Expect a title "to contain" a substring.
    });

});