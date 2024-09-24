import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Common sign-in process that runs before each test
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'visual_user');    // Fill in the user name
  await page.fill('#password', 'secret_sauce');    // Fill in the password
  await page.click('#login-button');               // Click on the login button
  await page.waitForSelector('.inventory_item');   // Wait for inventory page to load
});

test('Verify Z to A sorting', async ({ page }) => {
  // Sort the items from Z to A
  await page.click('#react-burger-menu-btn');          // Open the menu
  await page.click('#inventory_sidebar_link');         // Click on All Items
  await page.click('#react-burger-cross-btn');         // Close the menu
  await page.selectOption('select[data-test="product-sort-container"]', 'za');  // Sort by Z to A

  // Verify sorting order
  const productNames = await page.$$eval('.inventory_item_name', items => 
    items.map(item => item.textContent)
  );
  const sortedNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNames);
});

test('Verify price order high to low', async ({ page }) => {
  // Sort the items by price from high to low
  await page.selectOption('select[data-test="product-sort-container"]', 'hilo');  // Sort by High to Low

  // Verify price sorting order
  const productPrices = await page.$$eval('.inventory_item_price', items => 
    items.map(item => parseFloat(item.textContent.replace('$', '')))
  );
  const sortedPrices = [...productPrices].sort((a, b) => b - a);
  expect(productPrices).toEqual(sortedPrices);
});

test('Cart and Checkout', async ({ page }) => {
  // Add items to the cart
  const itemsToAdd = ['sauce-labs-backpack', 'sauce-labs-bolt-t-shirt'];
  for (const item of itemsToAdd) {
    await page.click(`#add-to-cart-${item}`);
  }

  // Validate that the cart contains 2 items
  await page.click('#shopping_cart_container');
  const cartBadge = await page.textContent('.shopping_cart_badge');
  expect(cartBadge).toBe('2');

  // Proceed to checkout and fill out the form
  await page.click('#checkout');
  await page.fill('#first-name', 'sudarsan');
  await page.fill('#last-name', 'ramachandran');
  await page.fill('#postal-code', '641012');
  await page.click('#continue');

  // Validate the subtotal
  const cartItems = await page.$$eval('.inventory_item_price', items => 
    items.map(item => parseFloat(item.textContent.replace('$', '')))
  );
  const expectedSubtotal = cartItems.reduce((sum, price) => sum + price, 0);
  const displayedSubtotalLabel = await page.textContent('.summary_subtotal_label');
  const displayedSubtotal = parseFloat(displayedSubtotalLabel.replace('Item total: $', ''));
  expect(displayedSubtotal).toBe(expectedSubtotal);

  // Complete the checkout
  await page.click('#finish');
});

