import { test, expect } from '@playwright/test';

let page;

test.beforeEach(async ({ browser }) => {    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByRole('textbox', {name: 'password'}).fill('secret_sauce');
    await page.locator('xpath = /html/body/div/div/div[2]/div[1]/div/div/form/input').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.app_logo', { hasText: 'Swag Labs' })).toBeVisible();
    await page.waitForTimeout(1000);

});

test.skip('Add to cart', { tag: ['@withHooks'] },async ({  }) => {
    await page.locator('xpath = /html/body/div/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]/button').click();    // Expect a title "to contain" a substring.
    await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    await page.waitForTimeout(1000);
});

test.skip('Add all items to cart ', { tag: ['@withHooks'] },async ({  }) => {
    var countItems:number = await page.locator('.inventory_item_name ').count();
    for (let i=0;i<countItems; i++){
        await page.locator('.btn').nth(i).click();
        await page.waitForTimeout(1000);
    }});

test.skip('Has sauce in the name', { tag: ['@withHooks'] }, async ({  }) => {
    var products = page.locator('.inventory_item');
    var countItems = await products.count();
    for (let i = 0; i < countItems; i++) {
        const product = products.nth(i);
        const title = await product.locator('.inventory_item_name').textContent();
        if (title.includes('Sauce')) {
            await product.locator('.btn').click();
            await page.waitForTimeout(1000);
        }
    }
});

test('Sum of items from the cart is less than 30', { tag: ['@withHooks'] }, async ({  }) => {
    const productCards = page.locator('.inventory_item');
    const productCount = await productCards.count();

    let total = 0;
    let addedProducts: string[] = [];

    for (let i = 0; i < productCount; i++) {
        const product = productCards.nth(i);
        const priceText = await product.locator('.inventory_item_price').innerText(); // ex: "$7.99"
        const title = await product.locator('.inventory_item_name').innerText();
        const price = parseFloat(priceText.replace('$', ''));

        if (total + price <= 30) {
            // Adaugă în coș
            await product.locator('button:has-text("Add to cart")').click();
            total += price;
            addedProducts.push(`${title} - $${price.toFixed(2)}`);
        }
    }

    // 3. Afișează produsele adăugate și totalul
    console.log('Produse adăugate în coș:');
    addedProducts.forEach(item => console.log(' - ' + item));
    console.log(`Total în coș: $${total.toFixed(2)}`);

    // 4. Verificare: badge-ul de coș reflectă numărul de produse
    const cartBadge = page.locator('.shopping_cart_badge');
    const cartCount = parseInt(await cartBadge.textContent() || '0');
    expect(cartCount).toBe(addedProducts.length);
    expect(total).toBeLessThanOrEqual(30);
});