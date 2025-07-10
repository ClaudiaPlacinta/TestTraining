import { test, expect } from '@playwright/test';
import {clickFirstXButtonsFromLocator} from "../.github/function";

// test.skip('has title', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//
//   Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
// });

const test_data = {
  countNumber: 6,
  numeArticol: 'blabla'
};

  test('get started link', {tag: ['@smoke']}, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByRole('textbox', {name: 'password'}).fill('secret_sauce');
    await page.locator('xpath = /html/body/div/div/div[2]/div[1]/div/div/form/input').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.app_logo', { hasText: 'Swag Labs' })).toBeVisible();
    await page.waitForTimeout(5000);

    // Check the Sauce Labs Backpack
    await page.locator('//*[@id="item_4_title_link"]/div').click();
    await page.waitForTimeout(5000);
    await expect(page.locator('.inventory_details_desc_container .inventory_details_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('xpath = //div[@class=\'inventory_details_price\']', { hasText: '29.99' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'add-to-cart\']').click();
    await page.waitForTimeout(5000);
    await expect(page.locator('xpath = //a/span[@class=\'shopping_cart_badge\']', { hasText: '1' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'remove\']').click();
    await expect(page.locator('xpath = //a[@class=\'shopping_cart_link\']')).toBeVisible();
    await page.locator('xpath = //button[@name=\'back-to-products\']').click();

    //Check the Sauce Labs Bike Light page
    await page.locator('xpath = (//div[@class=\'inventory_item_name \'])[2]').click();
    await expect(page.locator('.inventory_details_desc_container .inventory_details_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();
    await expect(page.locator('xpath = //div[@class=\'inventory_details_price\']', { hasText: '9.99' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'add-to-cart\']').click();
    await expect(page.locator('xpath = //a/span[@class=\'shopping_cart_badge\']', { hasText: '1' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'remove\']').click();
    await expect(page.locator('xpath = //a[@class=\'shopping_cart_link\']')).toBeVisible();
    await page.locator('xpath = //button[@name=\'back-to-products\']').click();

    //Check the Sauce Labs Bolt T-shirt page
    await page.locator('xpath = (//div[@class=\'inventory_item_name \'])[3]').click();
    await expect(page.locator('.inventory_details_desc_container .inventory_details_name', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await expect(page.locator('xpath = //div[@class=\'inventory_details_price\']', { hasText: '15.99' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'add-to-cart\']').click();
    await expect(page.locator('xpath = //a/span[@class=\'shopping_cart_badge\']', { hasText: '1' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'remove\']').click();
    await expect(page.locator('xpath = //a[@class=\'shopping_cart_link\']')).toBeVisible();
    await page.locator('xpath = //button[@name=\'back-to-products\']').click();

    //Check the Sauce Labs Fleece Jacket page
    await page.locator('xpath = (//div[@class=\'inventory_item_name \'])[4]').click();
    await expect(page.locator('.inventory_details_desc_container .inventory_details_name', { hasText: 'Sauce Labs Fleece Jacket' })).toBeVisible();
    await expect(page.locator('xpath = //div[@class=\'inventory_details_price\']', { hasText: '49.99' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'add-to-cart\']').click();
    await expect(page.locator('xpath = //a/span[@class=\'shopping_cart_badge\']', { hasText: '1' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'remove\']').click();
    await expect(page.locator('xpath = //a[@class=\'shopping_cart_link\']')).toBeVisible();
    await page.locator('xpath = //button[@name=\'back-to-products\']').click();

    //Check the Sauce Labs Onesie page
    await page.locator('xpath = (//div[@class=\'inventory_item_name \'])[5]').click();
    await expect(page.locator('.inventory_details_desc_container .inventory_details_name', { hasText: 'Sauce Labs Onesie' })).toBeVisible();
    await expect(page.locator('xpath = //div[@class=\'inventory_details_price\']', { hasText: '7.99' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'add-to-cart\']').click();
    await expect(page.locator('xpath = //a/span[@class=\'shopping_cart_badge\']', { hasText: '1' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'remove\']').click();
    await expect(page.locator('xpath = //a[@class=\'shopping_cart_link\']')).toBeVisible();
    await page.locator('xpath = //button[@name=\'back-to-products\']').click();

    //Check the Test.allTheThings() T-Shirt (Red) page
    await page.locator('xpath = (//div[@class=\'inventory_item_name \'])[6]').click();
    await expect(page.locator('.inventory_details_desc_container .inventory_details_name', { hasText: 'Test.allTheThings() T-Shirt (Red)' })).toBeVisible();
    await expect(page.locator('xpath = //div[@class=\'inventory_details_price\']', { hasText: '15.99' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'add-to-cart\']').click();
    await expect(page.locator('xpath = //a/span[@class=\'shopping_cart_badge\']', { hasText: '1' })).toBeVisible();
    await page.locator('xpath = //button[@name=\'remove\']').click();
    await expect(page.locator('xpath = //a[@class=\'shopping_cart_link\']')).toBeVisible();
    await page.locator('xpath = //button[@name=\'back-to-products\']').click();

    //Count the add to cart buttons and click
    const locator = page.locator('.btn.btn_primary.btn_small.btn_inventory');
    await clickFirstXButtonsFromLocator(locator, test_data.countNumber);

    //Scroll in to see the shopping cart and count the items from the cart
    const cartNumber =  page.locator("//span[@class='shopping_cart_badge']");
    await cartNumber.scrollIntoViewIfNeeded();
    const quantityText = await cartNumber.textContent();
    const quantity = Number((quantityText ?? '').trim());
    expect(quantity).toStrictEqual(test_data.countNumber);

    await page.pause();
  });