import {expect, test} from '@playwright/test';

let page;

test.beforeEach(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('https://demoqa.com/automation-practice-form');
    await expect(page.locator('.text-center', {hasText: 'Practice Form'})).toBeVisible();
    await page.waitForTimeout(1000);
});

    test('Fill first name, last name and email', {tag: ['@withHooks']}, async ({}) => {
        await page.getByPlaceholder('First Name').fill('Ana');
        await page.getByPlaceholder('Last Name').fill('Banana');
        await page.getByPlaceholder('name@example.com').fill('anabanana@gmail.com');
    });

    test('Select the gender', {tag: ['@withHooks']}, async ({}) => {
        await page.locator('//label[text()="Female"]').click();    // Expect a title "to contain" a substring.
    });

test('Fill mobile number and check the number', {tag: ['@withHooks']}, async ({}) => {
    await page.getByPlaceholder('Mobile Number').fill('0756345275');
    const phoneInput = await page.getByPlaceholder('Mobile Number'); // înlocuiește cu selectorul real
    await expect(phoneInput).toBeVisible();
    const phoneValue = await phoneInput.inputValue();

    // Verifică dacă este un număr format exact din 10 cifre
    const isValidPhone = /^\d{10}$/.test(phoneValue);

    // Afișează rezultatul
    console.log(`Numărul de telefon este ${isValidPhone ? 'valid' : 'invalid'}`);

    // Așteptare logică pentru test
    expect(isValidPhone).toBe(true);
});

test('Fill mobile number wrong and check the number', {tag: ['@withHooks']}, async ({}) => {
    await page.getByPlaceholder('Mobile Number').fill('0756345');
    const phoneInput = await page.getByPlaceholder('Mobile Number'); // înlocuiește cu selectorul real
    await expect(phoneInput).toBeVisible();
    const phoneValue = await phoneInput.inputValue();

    // Verifică dacă este un număr format exact din 10 cifre
    const isValidPhone = /^\d{10}$/.test(phoneValue);

    // Afișează rezultatul
    console.log(`Numărul de telefon este ${isValidPhone ? 'valid' : 'invalid'}`);

    // Așteptare logică pentru test
    expect(isValidPhone).toBe(false);
});