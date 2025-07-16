import {expect, test} from '@playwright/test';
import * as path from "node:path";
import * as fs from "node:fs";

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

test('Date of birth input', {tag: ['@withHooks']}, async ({}) => {
    const dataNasterii = '15 05 1990'; // format ISO
    const dateInput = page.locator('#dateOfBirthInput'); // înlocuiește cu selectorul real

    await dateInput.fill(dataNasterii); // introduce direct data
    await expect(dateInput).toHaveValue(dataNasterii); // validare
});

test('Fill the subject', {tag: ['@withHooks']}, async ({}) => {
    await page.locator('.subjects-auto-complete__value-container').fill('Subject');
});

test('Click the hobbies checkboxes', {tag: ['@withHooks']}, async ({}) => {
    await page.locator('xpath= (//label[@class=\'custom-control-label\'])[4]').click();
    await page.locator('xpath= (//label[@class=\'custom-control-label\'])[5]').click();
    await page.locator('xpath= (//label[@class=\'custom-control-label\'])[6]').click();
});

test('Select a picture', {tag: ['@withHooks']}, async ({}) => {
    // await page.locator('.form-control-file').click();
    const imagePath = path.resolve(__dirname, '../assets/bunny.jpg.jpg');

    // Verificăm că fișierul există (opțional, dar util)
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Fișierul nu a fost găsit la: ${imagePath}`);
    }

    // Selectăm inputul de fișier și încărcăm imaginea
    const fileInput = page.locator('#uploadPicture');
    await fileInput.setInputFiles(imagePath);

    // Verificăm că numele fișierului a fost introdus
    const fileName = await fileInput.evaluate(input => input.files?.[0]?.name);
    expect(fileName).toBe('bunny.jpg.jpg');
});

test('Fill the address, state and city', {tag: ['@withHooks']}, async ({}) => {
    // 1. Completează "Current Address"
    await page.getByPlaceholder('Current Address').fill('Strada Florilor, nr. 4, Cluj');

    // 2. Selectează State (ex: NCR)
    // await page.locator('xpath= (//div[@class=\' css-tlfecz-indicatorContainer\'])[1]').click(); // deschide dropdownul
    // await page.locator('.css-26l3qy-menu div:has-text("NCR")').nth(0).click();
    //
    // // 3. Selectează City (ex: Delhi, valabil doar dacă ai ales NCR)
    // await page.locator('xpath= (//div[@class=\' css-tlfecz-indicatorContainer\'])[2]').click(); // deschide dropdownul
    // await page.locator('.css-26l3qy-menu div:has-text("Delhi")').nth(0).click();

    await page.locator('xpath= (//div[@class=\' css-tlfecz-indicatorContainer\'])[1]').click();
    await page.getByText('NCR', { exact: true }).click();

    await page.locator('#city').click();
    await page.getByText('Delhi', { exact: true }).click();

    // (Opțional) Verificări
    await expect(page.locator('#currentAddress')).toHaveValue(/Cluj/);
    await expect(page.locator('#state')).toContainText('NCR');
    await expect(page.locator('#city')).toContainText('Delhi');
    });